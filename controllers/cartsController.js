const { Cart, CartProduct } = require('../database/models');

const controller = {
	store: async (req, res) => {
		const storedCart = await Cart.create({
			userId: req.authData.id,
			total: 0,
			state: 'preparando'
		});

		let products = req.body.products;

		products.forEach(onePdto => {
			CartProduct.create({
				cartId: storedCart.id,
				productId: onePdto.id,
				productPrice: onePdto.price,
				quantity: onePdto.qty,
			})
		})

		const totalPrice = products.reduce((price, product) => {
			return price + (product.price * product.qty);
		}, 0)

		await storedCart.update({
			total: totalPrice
		}, {
			where: { id: storedCart.id }
		})

		return res.json(storedCart);
	},

	status: async (req, res) => {
		const state = req.query.state;

		let carts = await Cart.findAll({ 
			where: { 
				userId: req.authData.id,
				state: state
			},
			include: ['products']
		});

		return res.json(carts);
	},

	changeStatus: async (req, res) => {
		const newState = req.query.newState;

		let cartUpdated = await Cart.update({ 
			state: newState
		}, { 
			where: { 
				userId: req.authData.id,
				id: req.params.cartId 
			}  
		});
		
		if (cartUpdated.pop() === 1) {
			return res.json({
				status: 200,
				message: 'Your cart has been updated'
			});
		}

		return res.json({
			status: 500,
			message: 'We have some issues updating your cart, try again!'
		})
	}
}

module.exports = controller;