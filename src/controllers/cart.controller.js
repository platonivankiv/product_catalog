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
}
module.exports = new CartController()
