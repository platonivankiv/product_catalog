const Router = require('express')
const productsController = require('../controllers/products.controller')
const middlewares = require('../middlewares')

console.log(middlewares)

const router = new Router()

router.get('/', productsController.getProductsList)

router.get('/:id', productsController.getOneProduct)

router.post('/', productsController.createProduct)

router.put('/:id', productsController.updateProduct)

router.delete('/:id', productsController.deleteProduct)

router.delete('/', productsController.deleteMultipleProducts)

module.exports = router
