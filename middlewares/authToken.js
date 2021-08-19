const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(' ')[1];

		jwt.verify(token, 'delilah_api', (err, decoded) => {
			if (err) {
				return res.status(403).send({
					status: 'error',
					message: 'Failed to authenticate token.'
				});
			} else {
				console.log(decoded);
				req.authData = decoded;
				next();
			}
		});
	} else {
		res.status(403).send({
			status: 'error',
			message: 'No token provided.'
		});
	}
}

module.exports = verifyToken;