const prisma = require('../db/prisma')

class ProductsService {
	async getProductsList() {
		return prisma.product.findMany()
	}
}

module.exports = new ProductsService()
