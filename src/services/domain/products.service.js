const prisma = require('../db/prisma')

class ProductsService {
  async getProductsList() {
    return prisma.product.findMany()
  }

  async getOneProduct(id) {
    return prisma.product.findUnique({
      where: { id: +id },
    })
  }

  async createProduct(data) {
    return prisma.product.create({
      data,
    })
  }

  async updateProduct(id, data) {
    return prisma.product.update({
      where: {
        id: +id,
      },
      data,
    })
  }

  async deleteProduct(id) {
    return prisma.product.delete({
      where: { id: +id },
    })
  }

  async deleteMultipleProducts(ids) {
    return prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  }
}

module.exports = new ProductsService()
