const { UserService } = require('../services/domain/user.service')
const prisma = require('../services/db/prisma')

class UsersController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await UserService.registration(email, password)

      res.status(201).json({
        message: 'The user has been successfully registered',
        user: userData.user,
        accessToken: userData.accessToken,
      })
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await UserService.login(email, password)
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const userId = await prisma.user.userId
      await UserService.logout(userId)
      return res.status(204).json({
        message: 'You have successfully logged out of your account',
      })
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers()
      return res.json(users)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UsersController()
