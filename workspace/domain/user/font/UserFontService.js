'use strict';
var UserFontRepository = require('./UserFontRepository');
var Font = require('../../font/Font');
var FontRepository = require('../../font/FontRepository');
var UserFont = require('./UserFont');

var UserFontService = function () {
    this._$constructor();
}


UserFontService.prototype =  {

    _$constructor: function() {
        this.userFontRepository  = new UserFontRepository();
        this.fontRepository = new FontRepository();
    },

    create : function(userId , name) {
        var fontArray = new Array();

        var dummyFontSize = 3;

        for (var indexI = 0; indexI < dummyFontSize; indexI++) {
            var dummyFont = new Font('test' , 'test');
            this.fontRepository.save(dummyFont);
            fontArray.push(dummyFont);
        }

        var dummyUserFont = new UserFont(userId , name , fontArray);

        this.userFontRepository.add(dummyUserFont);
    },

    getByUserId: function (userId) {
        return this.userFontRepository.findByUserId(userId);
    },
};

module.exports = UserFontService;