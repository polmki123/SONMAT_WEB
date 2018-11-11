'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('sonmat_request', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        from_user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: { model: models.user, key: 'id' }
        },
        to_user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: { model: models.user, key: 'id' }
        },
        sonmat_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: models.sonmat, key: 'id' }
        },
        send_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
            field: 'read_state'
        }
    }, {
        tableName: 'sonmat_request',
        underscored: true,
        timestamps: false
    });
};
