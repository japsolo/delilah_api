'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define('User', {
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		userName: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		phoneNumber: DataTypes.STRING,
		address: DataTypes.STRING,
		admin: DataTypes.NUMBER,
	});

	model.associate = (models) => {
		model.hasMany(models.Cart, {
			as: 'carts',
			foreignKey: 'userId'
		})
	}

	return model;
};