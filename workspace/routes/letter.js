var express = require('express');
var router = express.Router();

router.get('/read', function(req, res) {
	res.render('read');
});

router.get('/write', function(req, res) {
	res.render('write');
});

router.post('/write', function(req,res) {

});

router.get('/mailbox', function(req, res) {
	res.render('mailbox');
});

module.exports = router;