var express = require('express');
var router = express.Router();
var models = require('../model');

var file_service = require('../service/file_service');

router.get('/upload', function (req, res) {

    res.render('handwrite-upload');
});

router.post('/file', function(req, res) {

    //console.log(req.body);
    //file_service.image_dir_change(req.files.file, 'font', '1', '1');

    res.send(200);
});

module.exports = router;