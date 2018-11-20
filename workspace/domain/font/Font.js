'use strict';
var RandomUtils = require('../utils/RandomUtils');
var Font = function (name , path) {
    this._$constructor(name , path);
}

Font.prototype =  {
    _$constructor: function(name , path) {
        this.id = RandomUtils.generateId();
        this.name = name;
        this.path = path;
    }
};

module.exports = Font;