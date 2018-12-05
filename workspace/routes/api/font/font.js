var express = require('express');
var router = express.Router();
var FontRepository = require('./FontRepository');
var font_service = require('../../../service/font_service');

router.post('/', function(req, res) {

    font_id = FontRepository.createNewFont(req.user.id, req.body);

    res.send();
});


// 유저가 확인 하지 않은 새 폰트 목록을 리턴한다.
router.get('/new', function(req, res) {

    // TODO userID 를 이용해 새로 만들어진 font list 를 select 한다.
    // 새로 만들어진 font list 를 리턴한다.

    FontRepository.findNewByUserId(req.user.id)
    .then(function(body) {
        res.send(body);
    }).catch(function(err) {
        console.log(err);
    });
});


// 현재 시간 기준으로 생성된 모든 폰트를 확인함 으로 처리한다.
router.post('/new/checked', function(req, res) {
    // TODO 현재 시간 기준으로 유저가 생성한 font 목록을 확인함 ( checked ) 로 처리한다.
    FontRepository.checkedByUserId(req.user.id)
    .then(function(_) {
        res.send();
    }).catch(function(err) {
        console.log(err);
    });

});

// font make complete message from SONMAT-DeepWeb
router.post('/make/complete', function(req, res) {

    var body = req.body;

    // font의 making_status update
    font_service.notify_complete(body.font_id)
    .then(function(result){

    // font_file_map
        return font_service.save_font_urls(body.font_id, body.fontUrls);
    }).then(function(result) {

        res.send(result);

    }).catch(function(err) {
        console.log(err);
    });
});

router.get('/font_service_test', function(req, res) {

    function formatDate(date_time){

        var utc = date_time.getTime() + (date_time.getTimezoneOffset() * 60000);
        var SEOUL_TIME_OFF_SET = 9;
        date_time = new Date(utc + (3600000*SEOUL_TIME_OFF_SET));

        var yyyy = date_time.getFullYear().toString();
        var MM = pad(date_time.getMonth() + 1,2);
        var dd = pad(date_time.getDate(), 2);
        var hh = pad(date_time.getHours(), 2);
        var mm = pad(date_time.getMinutes(), 2)
        var ss = pad(date_time.getSeconds(), 2)
        return yyyy+'/'+MM+'/'+dd+' '+hh+':'+mm;
    }

    function pad(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }

    var body = {};

    var date = new Date();


    body.date = date;
    body.date_toString = formatDate(date);

    res.send(body);
});


router.get('/font_service_test2', function(req, res) {

    var font_service = require('../../../service/font_service');

    // [ { id: 73,
    //     user_id: 2,
    //     name: '더블썬칩손맛체',
    //     description: '썬칩 조아 너무 조아',
    //     making_status: 'complete',
    //     open_state: 'private',
    //     making_date: 2018-11-19T02:39:38.000Z,
    //     read_state: 'read',
    //     user: { name: '정형호' } },]

    // font_service.find_my_font_userid(req.body.id)
    // .then(function(font){
    //     console.log(font)
    //     res.send(user.name);
    // }).catch(function(err) {
    //     console.log(err);
    // });
});




module.exports = router;