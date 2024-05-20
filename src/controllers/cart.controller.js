const cartService = require('../services/domain/cart.service')

class CartController {
  async addItemToCart(req, res, next) {
    try {
      const { userId } = req.user
      const { productId, quantity } = req.body

      await cartService.addProductToCart(userId, productId, quantity)
      return res.send({
        status: 200,
        msg: 'Product added to cart successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  async getCartItems(req, res, next) {
    try {
      const { userId } = req.user
      const cartItems = await cartService.getCartByUserId(userId)
      res.json(cartItems)
    } catch (error) {
      next(error)
    }
  }

  async checkout(req, res, next) {
    try {
      const { userId } = req.user
      const { productId, quantity } = req.body
      const result = await cartService.completePurchase(
        userId,
        productId,
        quantity,
      )
      res.status(200).json({ message: result.message })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = new CartController()
