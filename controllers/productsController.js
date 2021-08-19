const { User, Product } = require('../database/models');

const controller = {
	root: async (req, res) => {
		let products = await Product.findAll();
		return res.json(products);
	},

	detail: async (req, res) => {
		let product = await Product.findByPk(req.params.id);
		if (!product) {
			return res.status(404).json({
				status: 404,
				message: 'Product not found'
			})
		}
		return res.json(product);
	},

	store: async (req, res) => {
		const userLogged = await User.findByPk(req.authData.id);

		if (userLogged.admin === 1) {
			let newProduct = await Product.create(req.body);
			return res.json({
				status: 200,
				message: 'Product stored in database',
				data: newProduct
			});
		}

		return res.status(500).json({
			status: 500,
			message: 'You are not admin and don\'t have permissions to create products',
		})
	},

	edit: async (req, res) => {
		const userLogged = await User.findByPk(req.authData.id);

		if (userLogged.admin === 1) {
			let wasEdited = await Product.update(req.body, { where: { id: req.params.id } });
			
			if (!wasEdited) {
				return res.status(500).json({
					status: 500,
					message: 'Some troubles ok!',
				});
			}

			return res.json({
				status: 200,
				message: 'Product updated ok!',
			});
		}

		return res.status(500).json({
			status: 500,
			message: 'You are not admin and don\'t have permissions to create products',
		});
	},

	delete: async (req, res) => {
		const userLogged = await User.findByPk(req.authData.id);

		if (userLogged.admin === 1) {
			let wasDeleted = await Product.destroy({ where: { id: req.params.id } });

			if (!wasDeleted) {
				return res.status(500).json({
					status: 500,
					message: 'Some troubles deleting the product!',
				});
			}

			return res.json({
				status: 200,
				message: 'Product deleted ok!',
			});
		}

		return res.status(500).json({
			status: 500,
			message: 'You are not admin and don\'t have permissions to create products',
		});
	}
}

module.exports = controller;