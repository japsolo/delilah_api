'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define('CartProduct', {
		cartId: DataTypes.INTEGER,
		productId: DataTypes.INTEGER,
		productPrice: DataTypes.DECIMAL,
		quantity: DataTypes.INTEGER,
	}, {
		tableName: 'cartProduct',
	});

	return model;
};