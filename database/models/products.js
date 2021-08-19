'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define('Product', {
		name: DataTypes.STRING,
		price: DataTypes.NUMBER,
		image: DataTypes.STRING,
		description: DataTypes.STRING,
	});

	return model;
};