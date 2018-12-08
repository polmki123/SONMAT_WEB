var express = require('express');
var router = express.Router();
var FontRepository = require('./FontRepository');
var font_service = require('../../../service/font_service');

router.post('/', function(req, res) {

    font_id = FontRepository.createNewFont(req.user, req.body);

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


router.post('/:font_id', function(req, res) {
    var body = req.body;
    var fon_id = req.params.font_id;
    font_service.update_font_information(fon_id, body.name, body.description)
    .then(function(result) {
        res.send(result);

    }).catch(function(err) {
        console.log(err);
    });
});


module.exports = router;