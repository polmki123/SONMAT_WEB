var User = function (id , password) {
    this._$constructor(id , password);
}

User.prototype =  {
    _$constructor: function(id , password) {
        this.id = id;
        this.password = password;
    },

    matchPassword: function (password) {
        return this.password === password;
    }
};

module.exports = User;