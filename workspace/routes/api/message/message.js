var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var message_service = require('../../../service/message_service');
var message_share_service = require('../../../service/message_share_service');
var smsUtils = require('../../../domain/utils/SmsUtils');

router.post('/', function(req, res) {
    
    req.body.user_id = req.user.id;

    message_service.send_message(req.body)
    .then(function(sonmat_request_id) {
        res.send('' + sonmat_request_id);
    }).catch(function(err) {
        console.log(err);
    });
});


router.get('/download_paper', function(req, res) {
    var file_path = path.join(__dirname, '..', '..', '..', 'repository', 'font', '54', 'handwrite.jpg');

    res.download(file_path); 
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


// SNS으로 편지 공유(전송)
router.post('/share', function(req, res) {

    req.body.user_id = req.user.id;
    req.body.user_name = req.user.name;

    message_service.send_message(req.body)
        .then(function(sonmat_request_id) {

            return message_share_service.generate_temp_url(sonmat_request_id);
        })
        .then(function(temp_url) {

            var response = {};
            response.url = temp_url;
            response.user_name = req.body.user_name;
            response.message_title = req.body.title;

            res.send(response);
        })
        .catch(function(err) {
            console.log(err);
    });
});

module.exports = router;