'use strict';

var models = require('./index');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Font', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    maker_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: models.User, key: 'id'}},
    name: {type: DataTypes.STRING(30)},
    description: {type: DataTypes.TEXT},
    make_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
    is_public: {type: DataTypes.BOOLEAN, defaultValue: false},
    follower_num: {type: DataTypes.INTEGER, defaultValue: null},    
  }, {
    classMethods: {},
    tableName: 'Font',
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  });
};
