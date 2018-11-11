'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('font', {
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
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
            field: 'making_status'
        },
        is_public: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
            field: 'open_state'
        },
        making_date: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at'
        }
    }, {
        tableName: 'font',
        underscored: true,
        timestamps: false
    });
};
