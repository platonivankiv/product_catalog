const ApiError = require('../../exceptions/api.error')
const prisma = require('../../services/db/prisma')

const checkUserRole = async (req, res, next) => {
  const userId = req.user.userId

  if (!userId) {
    return next(ApiError.UnauthorizedError())
  }

  try {
    const userWithRoles = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    })

    if (!userWithRoles || userWithRoles.roles.length === 0) {
      throw ApiError.UnauthorizedError()
    }

    const roles = userWithRoles.roles.map(
      (roleConnection) => roleConnection.role.role,
    )
    if (roles.includes('admin') || roles.includes('superadmin')) {
      next()
    } else {
      throw ApiError.NotPermissions()
    }
  } catch (error) {
    next(error)
  }
}
module.exports = checkUserRole
