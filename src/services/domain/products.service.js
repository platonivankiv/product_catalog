const prisma = require('../db/prisma')

class ProductsService {
  async getProductsList(
    page,
    pageSize,
    orderBy,
    orderDirection,
    minPrice,
    maxPrice,
    minCreatedAt,
    maxCreatedAt,
    minUpdatedAt,
    maxUpdatedAt,
  ) {
    if (!page || !pageSize) {
      return prisma.product.findMany()
    }

    const pageNum = parseInt(page, 10)
    const size = parseInt(pageSize, 10)

    // Validation
    // const validOrderBy = ['id', 'name', 'price', 'createdAt', 'updatedAt']
    // const order = validOrderBy.includes(orderBy) ? orderBy : 'id'
    // const direction = orderDirection === 'desc' ? 'desc' : 'asc'

    const skip = (pageNum - 1) * size

    const whereOptions = {
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
      ...(minCreatedAt && { createdAt: { gte: new Date(minCreatedAt) } }),
      ...(maxCreatedAt && { createdAt: { lte: new Date(maxCreatedAt) } }),
      ...(minUpdatedAt && { updatedAt: { gte: new Date(minUpdatedAt) } }),
      ...(maxUpdatedAt && { updatedAt: { lte: new Date(maxUpdatedAt) } }),
    }

    return prisma.product.findMany({
      where: whereOptions,
      take: size,
      skip,
      orderBy: {
        [orderBy]: orderDirection,
      },
    })
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

  async findProductBySku(sku) {
    return prisma.product.findMany({
      where: {
        sku: {
          equals: sku,
          mode: 'insensitive',
        },
      },
    })
  }
}

module.exports = new ProductsService()
