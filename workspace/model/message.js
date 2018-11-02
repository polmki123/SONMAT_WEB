'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Message', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		sender_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: models.User, key: 'id'}},
		receiver_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: models.User, key: 'id'}},
		send_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
		contents: {type: DataTypes.TEXT},
	}, {
		classMethods: {},
		tableName: 'Message',
		freezeTableName: true,
		underscored: true,
		timestamps: false,
	});
};