'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('font_file_map', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        font_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: models.font, key: 'id' }
        },
        file_path: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        underscored: true,
        timestamps: false,
        freezeTableName: true,
        tableName: 'font_file_map'
    });
};