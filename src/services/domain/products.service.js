const prisma = require('../db/prisma')

class ProductsService {
  productsListWhereOptions(data) {
    const {
      page = 1,
      limit,
      sortBy = 'id',
      sort = 'asc',
      minPrice,
      maxPrice,
      fromCreatedAt,
      toCreatedAt,
      fromUpdatedAt,
      toUpdatedAt,
      search,
    } = data

    const skip = (+page - 1) * (+limit || 0)

    const whereAnd = []

    const whereOptions = {
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
      ...(fromCreatedAt && {
        createdAt: { gte: new Date(fromCreatedAt).toISOString() },
      }),
      ...(toCreatedAt && {
        createdAt: { lte: new Date(toCreatedAt).toISOString() },
      }),
      ...(fromUpdatedAt && {
        updatedAt: { gte: new Date(fromUpdatedAt).toISOString() },
      }),
      ...(toUpdatedAt && {
        updatedAt: { lte: new Date(toUpdatedAt).toISOString() },
      }),
    }

    if (Object.keys(whereOptions).length) {
      whereAnd.push(whereOptions)
    }

    if (search) {
      whereAnd.push({
        sku: {
          contains: search,
          mode: 'insensitive',
        },
      })
    }

    const sortOptions = [
      {
        [sortBy]: sort,
      },
    ]

    return {
      sort: sortOptions,
      skip,
      limit: +limit,
      where: {
        AND: whereAnd,
      },
    }
  }

  async getProductsList(data) {
    const { where, skip, limit, sort } = this.productsListWhereOptions(data)
    const take = limit && +limit > 0 ? +limit : undefined
    return prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: sort,
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
}

module.exports = new ProductsService()
