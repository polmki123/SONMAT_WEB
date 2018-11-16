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
            making_status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 1
            },
            open_state: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 1
            },
            making_date: {
                type: DataTypes.DATE,
/*                allowNull: false,
                defaultValue: DataTypes.NOW,*/
                field: 'created_at'
            },
            read_state: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 1
            }
        },
        {
            tableName: 'font',
            freezeTableName: true,
            underscored: true,
            timestamps: false
        });
};
