const productsService = require('../services/domain/products.service')

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
      return res.send(newProduct)
    } catch (error) {
      next(error)
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params

      const updatedProduct = await productsService.updateProduct(id, req.body)
      return res.send(updatedProduct)
    } catch (error) {
      next(error)
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params

      await productsService.deleteProduct(id)
      return res.send({ status: 200, msg: 'Product deleted successfully.' })
    } catch (error) {
      next(error)
    }
  }

  async deleteMultipleProducts(req, res, next) {
    try {
      const { ids } = req.body

      const deletionResult = await productsService.deleteMultipleProducts(ids)
      return res.send({
        status: 200,
        msg: 'Product deleted successfully.',
        deletionResult,
      })
    } catch (error) {
      next(error)
    }
  }

  async uploadProductsFromCSV(req, res) {
    try {
      const filePath = req.body.filePath
      if (!filePath) {
        return res.status(400).json({ message: 'File path is required' })
      }
      const results = await productsService.uploadProductsFromCSV(filePath)
      res.status(200).json({
        message: 'Products uploaded successfully',
        data: results,
      })
    } catch (error) {
      console.error('Error uploading products from CSV:', error)
      res.status(500).json({
        message: 'An error occurred while uploading products',
        error: error.message,
      })
    }
  }
}
module.exports = new ProductsController()
