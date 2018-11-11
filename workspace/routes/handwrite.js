var express = require('express');
var router = express.Router();
var models = require('../model');

var User_Following_Font = require('../dao/User_Following_Font');
var User_Purchased_Message_Background = require('../dao/User_Purchased_Message_Background');
var Message = require('../dao/Message');


router.get('/write', function(req, res) {
	var font;
	var bg;

	User_Following_Font.get_Following_Font(req.user.id)
		.then(function(fonts){
			font = fonts;
			return User_Purchased_Message_Background.get_Purchased_Message_Background(req.user.id)
		}).then(function(msg_bg){
			bg = msg_bg
			console.log(font)
			console.log(bg)
			res.render('write');

		}).catch(function(err){
			res.send(err);
		})
});

router.post('/write', function(req,res) {
	res.send('write');
});

router.get('/mailbox', function(req, res) {
	res.render('mailbox');
});

module.exports = router;