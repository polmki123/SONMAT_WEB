'use strict';
var RandomUtils = require('../../utils/RandomUtils');
var UserFont = function (userId , name , fontList) {
    this._$constructor(userId , name , fontList);
}

UserFont.prototype =  {
    _$constructor: function(userId , name , fontList) {
        this.id = RandomUtils.generateId();
        this.userId = userId;
        this.name = name;
        this.fontList = new Array();
        this.createdAt = new Date();
        for (var indexI = 0; indexI < fontList.length; indexI++) {
            this.fontList.push(fontList[indexI]);
        }
    }
};

module.exports = UserFont;