'use strict';
var HashMap = require('hashmap');

var UserRepository = function () {
    this._$constructor();
}


UserRepository.prototype =  {

    _$constructor: function() {
        this.userMap = new HashMap();
    },


    save : function(user) {
        this.userMap.set(user.id , user);
    },

    findOneById: function (id) {
        return this.userMap.get(id);
    },
};

module.exports = UserRepository;