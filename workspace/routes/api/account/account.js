var express = require('express');

var router = express.Router();
var UserService = require('../../../domain/user/UserService');
var userService = new UserService();
var User = require('../../../domain/user/User');

var ERROR_STATUS = 500;
var NOT_AUTH_STATUS = 401;

router.post('/signup', function(req, res) {


    var user = new User(req.body.id , req.body.password);

    try {
        userService.register(user);
    } catch (e) {
        res.status(ERROR_STATUS).send({message : e.message});
    }

    res.send();
});

router.post('/login', function(req, res) {

    var user = userService.getOne(req.body.id  , req.body.password );

    if (user != null) {
        var session = req.session;
        session.user = user;
        res.send();
    } else {
        res.status(NOT_AUTH_STATUS).send({
            message : 'id 또는 password 를 확인해주세요'
        });
    }

});


module.exports = router;