'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true, 
			autoIncrement: true,
            allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { isEmail: true }
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
        tableName: 'user',
		underscored: true,
		timestamps: false
	});
};
