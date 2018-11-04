'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Message', {
		id: {
			type: DataTypes.INTEGER, 
			primaryKey: true, 
			autoIncrement: true
		},
		// id: {
		// 	type: DataTypes.UUID, 
		// 	primaryKey: true, 
		// 	defaultValue: DataTypes.UUIDV4,
		// 	autoIncrement: true
		// },
		sender_id: {
			type: DataTypes.INTEGER, 
			allowNull: false, 
			references: {model: models.User, key: 'id'}
		},
		receiver_id: {
			type: DataTypes.INTEGER, 
			allowNull: false, 
			references: {model: models.User, key: 'id'}
		},
		send_date: {
			type: DataTypes.DATE, 
			defaultValue: DataTypes.NOW
		},
		contents: {
			type: DataTypes.TEXT
		},
		// created_at: {
		// 	type: DataTypes.DATE,
		// 	allowNull: false
		// },
		// updated_at:  DataTypes.DATE,

		// deleted_at: DataTypes.DATE
	}, {
		tableName: 'Message',
		freezeTableName: true,
		underscored: true,
		timestamps: false,
	});
};