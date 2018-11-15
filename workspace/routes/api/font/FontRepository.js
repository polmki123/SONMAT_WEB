'use strict';

var FontRepository = function () {
    this._$constructor();
}


FontRepository.prototype =  {

    _$constructor: function() {
        this.fontList = new Array();
    },


    findNewByUserId : function(userId) {
        return this.fontList;
    },

    checkedByUserId: function (userId) {
        this.fontList = new Array();
    },

    createNewFont: function (userId) {
        var that = this;
        setTimeout(function () {
            var dummyFontSize = 3;

            for (var indexI = 0; indexI < dummyFontSize; indexI++) {
                var font = {
                    id : indexI,
                }
                that.fontList.push(font);
            }
        } , 5000 , 'test');

    },

    _createFont: function () {

    }
};

module.exports = FontRepository;