var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var message_service = require('../../../service/message_service');

router.post('/', function(req, res) {
    console.log(req.body.email)
    console.log(req.body.title)
    console.log(req.body.contents)

    req.body.font_id = 1
    req.body.user_id = req.user.id;

    message_service.send_message(req.body)
    .then(function(sonmat_request_id) {
        res.send('' + sonmat_request_id);
    }).catch(function(err) {
        console.log(err);
    });
});

router.post('/check_email', function(req, res) {

    message_service.find_user_by_email(req.body.email)
    .then(function(user) {
        if(user == null){
            res.send({});    
        }else{
            res.send(user.dataValues);   
        }
    }).catch(function(err) {
        console.log(err);
    });
});

module.exports = router;