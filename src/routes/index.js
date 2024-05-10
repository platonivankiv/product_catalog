const Router = require('express')

const productsRouter = require('./products')
const usersRouter = require('./users')
const cartRouter = require('./cart')

const router = new Router()

router.use('/products', productsRouter)
router.use('/', usersRouter)
router.use('/', cartRouter)

module.exports = router
