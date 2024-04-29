const Router = require('express')
const productsController = require('../controllers/products.controller')
const { productValidator } = require('../middlewares/validators')

const router = new Router()

router.get('/', productsController.getProductsList)

router.get(
  '/:id',
  productValidator.getSingleProduct,
  productsController.getOneProduct,
)

router.post(
  '/',
  productValidator.createProduct,
  productsController.createProduct,
)

router.put(
  '/:id',
  [productValidator.getSingleProduct, productValidator.createProduct],
  productsController.updateProduct,
)

router.delete(
  '/:id',
  productValidator.getSingleProduct,
  productsController.deleteProduct,
)

router.delete(
  '/',
  productValidator.deleteProducts,
  productsController.deleteMultipleProducts,
)

module.exports = router
