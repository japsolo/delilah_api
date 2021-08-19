'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define('Cart', {
		userId: DataTypes.NUMBER,
		total: DataTypes.NUMBER,
		state: DataTypes.STRING,
	});

	model.associate = (models) => {
		model.belongsTo(models.User, {
			as: 'user',
			foreignKey: 'userId'
		})

		model.belongsToMany(models.Product, {
			as: 'products',
			through: 'cartProduct',
			foreignKey: 'cartId',
			otherKey: 'productId',
		})
	}

	return model;
};