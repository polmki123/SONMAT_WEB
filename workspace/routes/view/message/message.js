var express = require('express');
var router = express.Router();
var msgB_service = require('../../../service/message_box_service')

/* index */
router.get('/', function(req, res, next) {
	res.render('message/list');
});

router.get('/form', function(req, res, next) {
	res.render('message/form');
});

router.get('/to/:toUserId/timeline', function(req, res, next) {
	var render_data = { uid: req.user.id, }
	var opponent_uid = req.params.toUserId
	msgB_service.get_opponents_name(req.user.id) // user
	.then(function(opponents){
		render_data.opponents = opponents;
		return msgB_service.get_message_timeline(req.user.id, opponent_uid)
	}).then(function(msgs){
		render_data.msgs = msgs;
		res.render('message/timeline', render_data);
	}).catch(function(err) {
		console.log(err);
		next()
	});

});

router.get('/to/:toUserId/:messageId', function(req, res, next) {
	var opponent_uid = req.params.toUserId
	var msg_id = req.params.messageId
	res.render('message/detail');
});


module.exports = router;
