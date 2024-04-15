const express = require('express')
const router = express.Router()
const baseController = require('../controllers/baseController')

router.get('/', baseController.helloWorld)

module.exports = router
