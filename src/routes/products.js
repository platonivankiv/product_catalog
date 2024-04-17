const Router = require('express')
const productsController = require('../controllers/products.controller')

const router = new Router()

router.get('/', productsController.getProductsList)
module.exports = router
