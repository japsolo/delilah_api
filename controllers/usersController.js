const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Cart } = require('../database/models');

// console.log(bcrypt.hashSync('Hello123456!', 10));

const controller = {
	register: async (req, res) => {
		/*
			(?=.*[a-z])The string must contain at least 1 lowercase alphabetical character
			(?=.* [A - Z]) The string must contain at least 1 uppercase alphabetical character
			(?=.* [0 - 9]) The string must contain at least 1 numeric character
			(?=.* [!@#$%^&*]) The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
			(?=.{ 8,}) The string must be eight characters or longer
		*/
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
		
		if (!passwordRegex.test(req.body.password)) {
			return res.send('El password necesita una letra minúscula, una mayúscula, un número, una caracter especial y ser tener 8 caracteres');
		}

		let userData = {
			...req.body,
			password: bcrypt.hashSync(req.body.password, 11)
		}

		let newUser = await User.create(userData);
		return res.json(newUser);
	},

	login: async (req, res) => {
		let user = await User.findOne({
			where: {
				'email': req.body.email
			}
		});

		// Cuando NO existe el email en nuestra base de datos
		if (user === null) {
			return res.json({
				status: 'error',
				message: 'Ese email no existe en nuestra base de datos'
			})
		} else if (user !== null && req.body.password === undefined) { // 123456
			// Cuando SI existe el usuario en DB pero no enviaron la contraseña
			return res.json({
				status: 'error',
				message: 'Tenés que enviar la contraseña',
			})
		} 

		// Cuando SI existe el email en nuestra base de datos
		if (bcrypt.compareSync(req.body.password, user.password)) {
			// Cuando la contraseña está CORRECTA
			// Generamos un token
			const token = jwt.sign({
				id: user.id,
				userEmail: user.email,
			}, 'delilah_api', {expiresIn: '600s'}) // 600s => 10 mins

			// Expiration Time Doc => https://stackoverflow.com/questions/45207104/how-to-set-jwt-token-expiry-time-to-maximum-in-nodejs/45209610

			return res.json({
				status: 'success',
				message: 'Bienvenido ' + user.firstName,
				token
			})
		} else { 
			// Cuando la contraseña está INCORRECTA
			return res.json({
				status: 'error',
				message: 'La contraseña está incorrecta'
			})
		}
	}
}

module.exports = controller;