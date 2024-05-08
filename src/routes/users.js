const Router = require('express')

const userController = require('../controllers/user.controller')
const { registrationAuthValidator } = require('../middlewares/validators')

const router = new Router()

router.post(
  '/registration',
  registrationAuthValidator.registrationValidationRules,
  userController.registration,
)
router.post('/login', userController.login)
<<<<<<< Updated upstream
router.post('/logout', userController.logout)
=======
>>>>>>> Stashed changes
router.get(
  '/users',
  registrationAuthValidator.authMiddleware,
  userController.getUsers,
)

module.exports = router
