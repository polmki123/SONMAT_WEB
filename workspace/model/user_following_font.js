'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User_Following_Font', {
        user_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey : true, references: {model: models.User, key: 'id'}},
        font_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey : true, references: {model: models.Font, key: 'id'}},
        
    }, {
        classMethods: {},
        tableName: 'User_Following_Font',
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });
};