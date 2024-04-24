const handleValidationErrors = require('./handle.validation.middleware.js')
const validateProductId = require('./id.validation.middleware.js')
const productCreateValidation = require('./create.validation.middleware.js')

module.exports = {
  handleValidationErrors,
  validateProductId,
  productCreateValidation,
}
