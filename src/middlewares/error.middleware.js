const ApiError = require('../exceptions/api.error')

module.exports = function (error, req, res, next) {
  console.log(error)
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      message: error.message,
      error: error.error,
    })
  }
  return res.status(500).json({ message: 'Unexpected error' })
}
