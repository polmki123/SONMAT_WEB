'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('font_follow', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: models.user, key: 'id' }
        },
        font_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: { model: models.font, key: 'id' }
        }
    }, {
        tableName: 'font_follow',
        underscored: true,
        timestamps: false
    });
};