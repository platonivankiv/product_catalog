module.exports = class ApiError extends Error {
  status
  errors

  constructor(status, message, errors) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static NotFoundError() {
    return new ApiError(404, 'Продукты не найдены')
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors)
  }
}
