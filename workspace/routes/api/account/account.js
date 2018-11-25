var express = require('express');
var router = express.Router();
var user_service = require('../../../service/user_service');


var ERROR_STATUS = 500;
var NOT_AUTH_STATUS = 401;

router.post('/signup', function(req, res) {

    user_service.register_user(req.body.id, req.body.password)
    .then(function(user, err){
        if(user == null){
            res.status(ERROR_STATUS).send({message : err});
        }else{
            var session = req.session;
            session.user = user;
            res.send();
        }
    }).catch(function(err) {
        console.log(err);
        res.send();
    });
});

router.post('/login', function(req, res) {
    user_service.login_check(req.body.id, req.body.password)
    .then(function(user, err){
        if(user == null){
            res.status(NOT_AUTH_STATUS).send({
                message : err,
            });
        }else{
            var session = req.session;
            session.user = user;
            res.send();
        }
    }).catch(function(err) {
        console.log(err);
        res.send();
    });
    
});


module.exports = router;