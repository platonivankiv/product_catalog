const Router = require('express')
const productsController = require('../controllers/products.controller')

const router = new Router()

router.get('/', productsController.getProductsList)
router.get('/:id', productsController.getOneProduct)
router.post('/', productsController.createProduct)
router.put('/:id', productsController.updateProduct)
router.delete('/:id', productsController.deleteProduct)
router.post('/delete-multiple', productsController.deleteMultipleProducts)
router.get('/search-by-sku/:sku', productsController.findProductBySku)

module.exports = router
