var express = require('express');
var router = express.Router();
var models = require('../model');

var hw_service = require('../service/handwrite_service');
var file_service = require('../service/file_service');
var font_service = require('../service/font_service');

router.post('/image_upload', function(req, res, next) {

	console.log('path : ', req.files.image.path)
	res.send(req.files.image.path)
});

module.exports = router;