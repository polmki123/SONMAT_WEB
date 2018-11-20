'use strict';
var HashMap = require('hashmap');

var FontRepository = function () {
    this._$constructor();
}


FontRepository.prototype =  {

    _$constructor: function() {
        this.fontMap = new HashMap();
    },


    save : function(font) {
        this.fontMap.set(font.id , font);
    },

    findOneById: function (id) {
        return this.fontMap.get(id);
    },
};

module.exports = FontRepository;