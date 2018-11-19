var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var FontRepository = require('./FontRepository');

router.post('/', function(req, res) {
    
    font_id = FontRepository.createNewFont(req.user.id, req.body.file_path);

    res.send();
});

router.get('/list', function(req, res) {

    var FONT_FILES_DIR_PATH = 'public/sonmat/font/';
    var FONT_FILE_PREFIX = '../sonmat/font/';

    // 폰트 파일 명 (확장자 없음)
    var font_names = [];
    // 폰트 다운로드 요청 경로
    var font_file_path = [];

    fs.readdirSync(FONT_FILES_DIR_PATH).forEach(function(font_name) {
        font_names.push(font_name.substring(0, font_name.lastIndexOf('\.')));
        font_file_path.push(FONT_FILE_PREFIX + font_name);
    });

    var body = {};
    body.font_names = font_names;
    body.font_file_path = font_file_path;

    res.send(body);
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


module.exports = router;