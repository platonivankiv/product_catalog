const Router = require('express')
const productsController = require('../controllers/products.controller')
const {
  productValidator,
  checkUserRole,
  registrationAuthValidator,
} = require('../middlewares/validators')

const router = new Router()

router.get('/', productsController.getProductsList)

router.get(
  '/:id',
  productValidator.getSingleProduct,
  productsController.getOneProduct,
)

router.post(
  '/',
  registrationAuthValidator.authMiddleware,
  checkUserRole,
  productValidator.createProduct,
  productsController.createProduct,
)

router.put(
  '/:id',
  registrationAuthValidator.authMiddleware,
  checkUserRole,
  [productValidator.getSingleProduct, productValidator.createProduct],
  productsController.updateProduct,
)

router.delete(
  '/:id',
  registrationAuthValidator.authMiddleware,
  checkUserRole,
  productValidator.getSingleProduct,
  productsController.deleteProduct,
)

router.delete(
  '/',
  registrationAuthValidator.authMiddleware,
  checkUserRole,
  productValidator.deleteProducts,
  productsController.deleteMultipleProducts,
)

router.post(
  '/upload',
  registrationAuthValidator.authMiddleware,
  checkUserRole,
  productsController.uploadProductsFromCSV,
)

module.exports = router
