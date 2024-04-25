const productsService = require('../services/domain/products.service')
const ApiError = require('../exceptions/api.error')

class ProductsController {
  async getProductsList(req, res, next) {
    try {
      const productsList = await productsService.getProductsList(req.query)

      res.json(productsList)
    } catch (error) {
      next(error)
    }
  }

  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params

      const product = await productsService.getOneProduct(id)
      return res.send(product)
    } catch (error) {
      next(error)
    }
  }

  async createProduct(req, res, next) {
    try {
      const newProduct = await productsService.createProduct(req.body)
      res.json(newProduct)
    } catch (error) {
      next(error)
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params

      if (isNaN(id)) {
        throw ApiError.BadRequest('Product ID must be a number.')
      }

      const updatedProduct = await productsService.updateProduct(id, req.body)
      res.json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params

      if (isNaN(id)) {
        throw ApiError.BadRequest('Product ID must be a number.')
      }

      await productsService.deleteProduct(id)
      res.json({ status: 200, msg: 'Product deleted successfully.' })
    } catch (error) {
      next(error)
    }
  }

  async deleteMultipleProducts(req, res, next) {
    try {
      const { ids } = req.body

      if (!Array.isArray(ids)) {
        throw ApiError.BadRequest('Product IDs must be an array.')
      }

      const deletionResult = await productsService.deleteMultipleProducts(ids)
      res.json({
        status: 200,
        msg: 'Product deleted successfully.',
        deletionResult,
      })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = new ProductsController()
