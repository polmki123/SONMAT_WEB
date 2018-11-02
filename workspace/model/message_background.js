'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Message_Background', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.INTEGER, defaultValue: null},    
  }, {
    classMethods: {},
    tableName: 'Message_Background',
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }); 
};
