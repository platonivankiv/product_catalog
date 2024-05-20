const prisma = require('../db/prisma')
const cron = require('node-cron')

class CartService {
  async releaseOldReservation() {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    console.log('The task of removing the old armor is completed')

    const reservedProducts = await prisma.cartItem.findMany({
      where: {
        createdAt: {
          lt: oneWeekAgo,
        },
      },
    })

    for (const item of reservedProducts) {
      await prisma.product.update({
        where: {
          id: item.productId,
        },
        data: {
          quantity: {
            increment: item.quantity,
          },
        },
      })
      await prisma.cartItem.delete({
        where: { id: item.id },
      })
    }
    console.log(
      'The release of the goods and the quantity update have been completed',
    )
  }

  scheduleReleaseOfOldReservations() {
    cron.schedule(
      '0 0 * * *',
      async () => {
        console.log(
          '[CronJob]: The beginning of the task of removing old armor',
        )
        try {
          await this.releaseOldReservation()
        } catch (error) {
          console.error('Error while performing cron task:', error)
        }
      },
      {
        scheduled: true,
        timezone: 'Europe/Moscow',
      },
    )
  }

  async processPayment(userId) {
    console.log(`Start of payment processing for the user ${userId}`)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const paymentSuccessful = true

        if (paymentSuccessful) {
          resolve({ success: true, message: 'The payment was successful' })
        } else {
          reject(new Error('Payment failed'))
        }
      }, 2000)
    })
  }

  async completePurchase(userId, productId, quantity) {
    try {
      const paymentResult = await this.processPayment(userId)

      if (paymentResult.success) {
        const cartItem = await prisma.cartItem.findFirst({
          where: {
            userId,
            productId,
          },
        })

        if (!cartItem || cartItem.quantity < quantity) {
          throw new Error('Not enough product in the cart or product not found')
        }

        await prisma.product.update({
          where: {
            id: productId,
          },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        })

        if (cartItem.quantity === quantity) {
          await prisma.cartItem.delete({
            where: { id: cartItem.id },
          })
        } else {
          await prisma.cartItem.update({
            where: { id: cartItem.id },
            data: {
              quantity: {
                decrement: quantity,
              },
            },
          })
        }

        console.log('The payment was successful, the order is completed.')
        return paymentResult
      } else {
        throw new Error(paymentResult.message)
      }
    } catch (error) {
      console.error('Error when completing the purchase:', error.message)
      throw error
    }
  }

  async addProductToCart(userId, productId, quantity) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product || product.quantity < quantity) {
      throw new Error('There is not enough product in stock')
    }

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

  async getCartByUserId(userId) {
    return prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    })
  }
}

module.exports = new CartService()
