var express = require('express');
var router = express.Router();
var msgB_service = require('../../../service/message_box_service');
var font_service = require('../../../service/font_service');
var message_share_service = require('../../../service/message_share_service');

/* index */
router.get('/list', function(req, res, next) {
	res.render_data.show_opponent = true
	res.render('message/list', res.render_data);
});

router.get('/form', function(req, res, next) {
    if (req.query.email){
        res.render_data.send_email = req.query.email;
    }else{
        res.render_data.send_email = null;
    }

    font_service.get_font_list(req.user.id).then(function(font_list) {

    	res.render_data.font_list = font_list;
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
	}).then(function(oppo_info){
        res.render_data.oppo_name = oppo_info.dataValues.name;
		return msgB_service.get_email_from_id(opponent_uid);
	}).then(function(oppo_email){
        res.render_data.oppo_email = oppo_email.dataValues.email;
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
		msgB_service.update_message_state(msg.id, req.user.id)
        return font_service.get_font_file_by_id(msg.sonmat.font_id);
	}).then(function(font_list) {
		res.render_data.font_list = font_list;
        res.render('message/detail', res.render_data);
    }).catch(function(err) {
		console.log(err);
		next()
	});
});

router.get('/share/list', function(req, res, next) {

    message_share_service.get_share_message(req.user.id)
    .then(function(message_list) {
        res.render_data.message_list = message_list;
        res.render('message/share_list', res.render_data);
    }).catch(function(err) {
        console.log(err);
        next();
    });
});

router.get('/share/:temp_url', function(req, res, next) {

    res.render_data.none_header = true;

    var temp_url = req.params.temp_url;

    message_share_service.get_sonmat_request_id_from_url(temp_url)
    .then(function(sonmat_request_id) {
        return msgB_service.get_message_from_id(sonmat_request_id);
    })
    .then(function(msg){
        res.render_data.msg = msg;

        return font_service.get_font_file_by_id(msg.sonmat.font_id);
    })
    .then(function(font_list){

        res.render_data.font_list = font_list;
        res.render('share_message', res.render_data);

    }).catch(function(err) {
        console.log(err);
        next()
    });
});

module.exports = router;
