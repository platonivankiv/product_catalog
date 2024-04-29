const { param, body } = require('express-validator')
const handleValidationResult = require('./validationResult')

module.exports = {
  getSingleProduct: [param('id').exists().isInt(), handleValidationResult],

  createProduct: [
    body('name').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('sku').notEmpty().isLength({ min: 2, max: 50 }),
    body('description').optional().isLength({ max: 500 }),
    handleValidationResult,
  ],

  deleteProducts: [body('ids').isArray({ min: 1 }), handleValidationResult],

  getListOfProducts: [],
}
