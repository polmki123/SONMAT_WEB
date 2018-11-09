'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_cloud_service', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true, 
			autoIncrement: true,
			allowNull: false
		},
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: { model: models.user, key: 'id' }
        },
		service_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		account: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
        tableName: 'user_link_cloud_service',
		underscored: true,
		timestamps: false
	});
};
