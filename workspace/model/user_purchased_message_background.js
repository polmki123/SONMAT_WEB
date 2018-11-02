'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User_Purchased_Message_Background', {
        user_id: {type: DataTypes.INTEGER, allowNull: false
            , references: {model: models.User, key: 'id'}},
        message_background_id: {type: DataTypes.INTEGER, allowNull: false
            , references: {model: models.Message_Background, key: 'id'}},
        
    }, {
        classMethods: {},
        tableName: 'User_Purchased_Message_Background',
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });
};