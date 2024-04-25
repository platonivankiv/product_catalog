const { param } = require('express-validator')
const handleValidationResult = require('./validationResult')

module.exports = {
  getSingleProduct: [param('id').exists().isInt(), handleValidationResult],
  /**
   * add new products validator below
   */
  getListOfProducts: [],
}
