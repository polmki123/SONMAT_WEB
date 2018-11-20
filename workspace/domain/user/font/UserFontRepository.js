'use strict';
var HashMap = require('hashmap');

var UserFontRepository = function () {
    this._$constructor();
}


UserFontRepository.prototype =  {

    _$constructor: function() {
        this.userFontMap = new HashMap();
    },


    add : function(userFont) {

        var userFontList = this.userFontMap.get(userFont.userId);

        if (typeof userFontList == "undefined") {
            userFontList = new Array();
        }

        userFontList.push(userFont);

        this.userFontMap.set(userFont.userId , userFontList);
    },

    findByUserId: function (userId) {
        return this.userFontMap.get(userId);
    },
};

module.exports = UserFontRepository;