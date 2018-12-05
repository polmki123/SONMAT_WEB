var express = require('express');
var router = express.Router();
var msgB_service = require('../../../service/message_box_service');
var font_service = require('../../../service/font_service');

/* index */
router.get('/list', function(req, res, next) {
	res.render_data.show_opponent = true
	res.render('message/list', res.render_data);
});

router.get('/form', function(req, res, next) {

    font_service.get_font_list(req.user.id).then(function(font_list) {

    	res.render_data.main_font_list = font_list.main_font_list;
    	res.render_data.variation_font_list = font_list.variation_font_list;

        res.render('message/form' , res.render_data);
    });
});

router.get('/to/:toUserId/timeline', function(req, res, next) {
	
	res.render_data.uid = req.user.id;

	var opponent_uid = req.params.toUserId;
	msgB_service.get_message_timeline(req.user.id, opponent_uid) // user
	.then(function(msgs){
		res.render_data.msgs = msgs;
		return msgB_service.get_name_from_id(opponent_uid);
	}).then(function(oppo_name){
		res.render_data.oppo_name = oppo_name.dataValues.name;;
		res.render('message/timeline', res.render_data);
	}).catch(function(err) {
		console.log(err);
		next()
	});
});

router.get('/to/:sonmat_request_id', function(req, res, next) {
	var son_id = req.params.sonmat_request_id;
	msgB_service.get_message_from_id(son_id) // user
	.then(function(msg){
		res.render_data.msg = msg;
		msgB_service.update_message_state(msg.id)
        return font_service.get_font_list(req.user.id);
	}).then(function(font_list) {
		res.render_data.variation_font_list = font_list.variation_font_list;
        res.render('message/detail', res.render_data);
    }).catch(function(err) {
		console.log(err);
		next()
	});
});


module.exports = router;
