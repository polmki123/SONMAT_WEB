'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.STRING(20), allowNull: true},
    email: {type: DataTypes.STRING(30), validate: {isEmail: true}},
    password: {type: DataTypes.STRING(20), allowNull: true},
    temp_key: {type: DataTypes.STRING(50), allowNull: true},
    is_linked_dropbox: {type: DataTypes.BOOLEAN, defaultValue: 0}, // or defaultValue: 0
    dropbox_account: {type: DataTypes.STRING(30), defaultValue: null},
  }, {
    classMethods: {},
    tableName: 'User',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  });
};
