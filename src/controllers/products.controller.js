const productsService = require('../services/domain/products.service')

class ProductsController {
	async getProductsList(req, res) {
		try {
			const productsList = await productsService.getProductsList()
			res.json(productsList)
		} catch (error) {
			res
				.status(500)
				.json({
					message: 'Произошла ошибка при получении списка продуктов',
					error: error.message,
				})
		}
	}
}

module.exports = new ProductsController()

// export const createProduct = async (req, res) => {
// 	const { title, description, price } = req.body
// 	const newProduct = await prisma.product.create({
// 		data: {
// 			title,
// 			description,
// 			price,
// 		},
// 	})

// 	return res.json({ status: 200, data: newProduct, msg: 'Product created.' })
// }
