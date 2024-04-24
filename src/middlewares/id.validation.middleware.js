const { param } = require('express-validator')

module.exports = validateProductId = param('id').isNumeric.withMessage(
  'ID продукта должен быть числом.',
)
