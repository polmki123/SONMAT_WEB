var express = require('express');
var router = express.Router();
var models = require('../model');
var service = require('../service/file_service')

/* GET home page. */
router.get('/', function(req, res) {
	

	// 메인 페이지를 보여준다.

	// DB 를 쿼리할 필요가 없어보인다. 
	res.render('index');
});

router.post('/test_upload', function(req, res){
	console.log(req.files);
	console.log(req.body);
	service.image_dir_change(req.files.image, 'font', '1', '1');
	// service.image_dir_change(req.files.image, 'handwrite_image', '.', '1')
	// service.image_dir_change(req.files.image, 'message_image', '.', '1')

})

router.get('/db/a', function(req, res) {
	models.user.findAll().then(function(results) {
		res.json(results);
	}).catch(function(err) {
		res.send(err);
	});
});

router.get('/db/b', function(req, res) {
	models.message.findAll().then(function(results) {
		res.json(results);
	}).catch(function(err) {
		res.send(err);
	});
});

router.get('/db/c', function(req, res) {
	models.font.findAll().then(function(results) {
		res.json(results);
	}).catch(function(err) {
		res.send(err);
	});
});

router.get('/db/d', function(req, res) {
	models.sonmat.findAll().then(function(results) {
		res.json(results);
	}).catch(function(err) {
		res.send(err);
	});
});

router.get('/shutdown', function(req, res) {
	process.exit(0);
	//
})

router.get('/ping', function(req, res) {
	res.sendStatus(200);
})

module.exports = router;
