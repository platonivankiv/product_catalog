const Router = require('express')

const cartController = require('../controllers/cart.controller')
const { registrationAuthValidator } = require('../middlewares/validators')

const router = new Router()

router.post(
  '/cart',
  registrationAuthValidator.authMiddleware,
  cartController.addItemToCart,
)

module.exports = router
