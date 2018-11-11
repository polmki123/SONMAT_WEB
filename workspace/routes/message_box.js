var express = require('express');
var router = express.Router();
var models = require('../model');
var msgB_service = require('../service/message_box_service')

router.get('/timeline/:opponent', function(req, res) {

	opponent_uid = req.params.opponent;
	
	msgB_service.get_message_timeline(req.user.id, opponent_uid)
	.then(function(msgs){
		res.json(msgs);
	}).catch(function(err){
		res.send(err);
	});
});

router.get('/message', function(req, res) {
	
});

module.exports = router;