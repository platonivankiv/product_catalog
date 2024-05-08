const prisma = require('../db/prisma')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require('../../dtos/user.dto')
const ApiError = require('../../exceptions/api.error')

class UserService {
  static async registration(email, password) {
    const candidate = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (candidate) {
      throw ApiError.BadRequest(`User with this email ${email} is existing`)
    }

    const hashPassword = await bcrypt.hash(password, 3)

<<<<<<< Updated upstream
=======
    const defaultRole = await prisma.role.findUnique({
      where: {
        name: 'user',
      },
    })

>>>>>>> Stashed changes
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
<<<<<<< Updated upstream
      },
    })

=======
        roles: {
          connect: { id: defaultRole.id },
        },
      },

      include: {
        roles: true,
      },
    })

    console.log(user)
>>>>>>> Stashed changes
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    return {
      ...tokens,
      user: userDto,
    }
  }

  static async login(email, password) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw ApiError.BadRequest(
        `User with this email ${email} is not registered`,
      )
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Password is not correct`)
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    return { ...tokens, user: userDto }
  }

<<<<<<< Updated upstream
  static async logout(userId) {
    return prisma.token.deleteMany({
      where: {
        userId,
      },
    })
  }

=======
>>>>>>> Stashed changes
  static async getAllUsers() {
    const users = await prisma.user.findMany()
    return users
  }
}
module.exports = {
  UserService,
}
