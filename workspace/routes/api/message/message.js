var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var message_service = require('../../../service/message_service');
var smsUtils = require('../../../domain/utils/SmsUtils');
router.post('/', function(req, res) {

    req.body.font_id = 1
    req.body.user_id = req.user.id;

    message_service.send_message(req.body)
    .then(function(sonmat_request_id) {
        res.send('' + sonmat_request_id);
    }).catch(function(err) {
        console.log(err);
    });
});


// sms exa
router.get('/sms', function(req, res) {
    // TO아래와 같이 사용 하시요
    smsUtils.send('01026527549' , 'test');
    res.end();
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