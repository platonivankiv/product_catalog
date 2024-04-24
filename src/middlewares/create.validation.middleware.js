const { body } = require('express-validator')
const productCreateValidation = [
  body('name').notEmpty().withMessage('Название продукта обязательно'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Цена продукта должна быть больше нуля.'),
  body('sku').notEmpty().withMessage('Название sku обязательно'),
]

module.exports = productCreateValidation
