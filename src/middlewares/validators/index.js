const productValidator = require('./products.validator')
const validationResult = require('./validationResult')
const registrationAuthValidator = require('./registration.auth.validator')
const checkUserRole = require('./checkUserRole')

module.exports = {
  productValidator,
  validationResult,
  registrationAuthValidator,
  checkUserRole,
}
