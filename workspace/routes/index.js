var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
	

	// 메인 페이지를 보여준다.

	// DB 를 쿼리할 필요가 없어보인다. 
	res.render('index');
});

router.get('/db/a', function(req, res) {
	models.User.findAll().then(function(results) {
		res.json(results);
	}).catch(function(err) {
		res.send(err);
	});
});

router.get('/db/b', function(req, res) {
	models.Message.findAll().then(function(results) {
		res.json(results);
	}).catch(function(err) {
		res.send(err);
	});
});

router.get('/db/c', function(req, res) {
	models.Font.findAll().then(function(results) {
		res.json(results);
	}).catch(function(err) {
		res.send(err);
	});
});

router.get('/db/d', function(req, res) {
	models.Message_Background.findAll().then(function(results) {
		res.json(results);
	}).catch(function(err) {
		res.send(err);
	});
});

router.get('/shutdwon', function(req, res) {
	process.exit(0);
	//
})

router.get('/ping', function(req, res) {
	res.sendStatus(200);
})

module.exports = router;
