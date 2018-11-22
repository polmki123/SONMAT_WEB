'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('message', {
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
		title: {
			type: DataTypes.STRING,
			allowNull: true
		},
		contents: {
			type: DataTypes.STRING,
			allowNull: true
		},
        contents_html: {
            type: DataTypes.STRING,
            allowNull: true
        }
	}, {
		tableName: 'message',
		underscored: true,
		timestamps: false
	});
};