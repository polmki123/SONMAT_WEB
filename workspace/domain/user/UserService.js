'use strict';
var UserRepository = require('./UserRepository');

var UserService = function () {
    this._$constructor();
}


UserService.prototype =  {

    _$constructor: function() {
        this.userRepository  = new UserRepository();
    },


    register : function(user) {
        var findOne = this.userRepository.findOneById(user.id);

        if (findOne != null) {
            throw new Error('사용 중인 ID 입니다.');
        } else {
            this.userRepository.save(user);
        }
    },

    getOne: function (id , password) {
        var user = this.userRepository.findOneById(id);

        if (user == null)
            return null;

        if (user.matchPassword(password))
            return user;
        else
            return null;
    },
};

module.exports = UserService;