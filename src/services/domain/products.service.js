const prisma = require('../db/prisma')
const fs = require('fs')
const csv = require('csv-parser')
const { Transform, pipeline } = require('stream')
const { promisify } = require('util')

const pipelineAsync = promisify(pipeline)

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

  async uploadProductsFromCSV(filePath) {
    const results = []
    let readableStream = fs.createReadStream(filePath)

    const parser = new Transform({
      objectMode: true,
      transform: async (chunk, encoding, callback) => {
        try {
          const data = {
            sku: chunk.sku,
            name: chunk.name || null,
            description: chunk.description || null,
            price: parseFloat(chunk.price) || null,
            quantity: parseInt(chunk.quantity) || 0,
          }
          const result = await this.createProduct(data)
          results.push(result)
          callback(null)
        } catch (error) {
          callback(error)
        }
      },
    })

    await pipelineAsync(readableStream, csv(), parser)
    console.log('Finished uploading products')
    return results
  }
}

module.exports = new ProductsService()
