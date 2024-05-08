const Router = require('express')

const productsRouter = require('./products')
const usersRouter = require('./users')
<<<<<<< Updated upstream
=======
const cartRouter = require('./cart')
>>>>>>> Stashed changes

const router = new Router()

router.use('/products', productsRouter)
router.use('/', usersRouter)
<<<<<<< Updated upstream
=======
router.use('/', cartRouter)
>>>>>>> Stashed changes

module.exports = router
