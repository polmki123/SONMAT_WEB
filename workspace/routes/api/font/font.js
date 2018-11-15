var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var models = require('../../../model');

var FontRepository = require('./FontRepository');
var dummyFontRepository = new FontRepository();

router.post('/', function(req, res) {

    var dummyUserId = req.cookies.JSESSIONID;
    dummyFontRepository.createNewFont(dummyUserId);
    var font = {};
    font.user_id = req.user.id;

    models.font.create(font).then( function(result) {

        // move directory
        var temp_file_path = req.body.file_path;
        var temp_dirname = path.dirname(temp_file_path);

        var dest_dirname = path.join(temp_dirname, '..', 'font', result.dataValues.id.toString());
        var dest_file_path = dest_dirname + "\\handwrite" + path.extname(temp_file_path);

        // create new directory : (repository_path)/font/{font_id}
        if (!fs.existsSync(dest_dirname)) {
            fs.mkdirSync(dest_dirname);
        }

        // move file
        fs.rename(temp_file_path, dest_file_path, function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });

        res.send(200);

    }).catch( function(err) {
        console.error(err);
    });
});


// 유저가 확인 하지 않은 새 폰트 목록을 리턴한다.
router.get('/new', function(req, res) {

    var dummyUserId = req.cookies.JSESSIONID;
    // TODO userID 를 이용해 새로 만들어진 font list 를 select 한다.
    // 새로 만들어진 font list 를 리턴한다.
    var body = {};

    body.fontList = dummyFontRepository.findNewByUserId(dummyUserId);

    res.send(body);

});


// 현재 시간 기준으로 생성된 모든 폰트를 확인함 으로 처리한다.
router.post('/new/checked', function(req, res) {
    var dummyUserId = req.cookies.JSESSIONID;
    // TODO 현재 시간 기준으로 유저가 생성한 font 목록을 확인함 ( checked ) 로 처리한다.
    dummyFontRepository.checkedByUserId(dummyUserId);
    res.send();

});


module.exports = router;