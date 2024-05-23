const Router = require('express')

const cartController = require('../controllers/cart.controller')
const { registrationAuthValidator } = require('../middlewares/validators')

const router = new Router()

router.post(
  '/cart',
  registrationAuthValidator.authMiddleware,
  cartController.addItemToCart,
)

router.post(
  '/cart/checkout',
  registrationAuthValidator.authMiddleware,
  cartController.checkout,
)

router.get(
  '/cart',
  registrationAuthValidator.authMiddleware,
  cartController.getCartItems,
)

module.exports = router
