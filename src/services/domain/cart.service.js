const prisma = require('../db/prisma')

class CartService {
  async addProductToCart(userId, productId, quantity) {
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        productId,
      },
    })
    if (existingCartItem) {
      return prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      })
    } else {
      return prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity,
        },
      })
    }
  }
}

module.exports = new CartService()
