const Router = require('express')
const productsRouter = require('./products')
const usersRouter = require('./users')

const router = new Router()

router.use('/products', productsRouter)
router.use('/', usersRouter)

module.exports = router
