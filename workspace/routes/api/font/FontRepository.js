'use strict';

var HashMap = require('hashmap');

var FontRepository = function () {
    this._$constructor();
}


FontRepository.prototype =  {

    _$constructor: function() {
        this.fontMap = new HashMap();
    },


    findNewByUserId : function(userId) {
        return this.fontMap.get(userId);
    },

    checkedByUserId: function (userId) {
        this.fontMap.remove(userId)
    },

    createNewFont: function (userId) {
        var that = this;
        setTimeout(function () {
            var dummyFontSize = 3;

            var fontList = new Array();
            for (var indexI = 0; indexI < dummyFontSize; indexI++) {
                var font = {
                    id : indexI,
                }
                fontList.push(font);
            }

            that.fontMap.set(userId , fontList);
        } , 5000 , 'test');

    },
};

module.exports = FontRepository;