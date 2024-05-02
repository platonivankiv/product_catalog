const { body } = require('express-validator')
const ApiError = require('../../exceptions/api.error')
const tokenService = require('../../services/domain/token-service')
const handleValidationResult = require('./validationResult')
const prisma = require('../../services/db/prisma')

const registrationValidationRules = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format.')
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          email: value,
        },
      })
      if (user) {
        throw new ApiError.Conflict(`User with email ${value} already exists.`)
      }
    }),

  body('password')
    .isLength({ min: 6, max: 32 })
    .withMessage('Password must be between 6 and 32 characters long.'),
  handleValidationResult,
]

function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      throw ApiError.UnauthorizedError()
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      throw ApiError.UnauthorizedError()
    }

    req.user = userData
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = {
  registrationValidationRules,
  authMiddleware,
}
