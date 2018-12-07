'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('sonmat', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        message_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: models.message, key: 'id' }
        },
        font_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: { model: models.font, key: 'id' }
        }
    }, {
        tableName: 'sonmat',
        underscored: true,
        timestamps: false
    });
};
