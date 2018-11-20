var express = require('express');
var router = express.Router();
var msgB_service = require('../../../service/message_box_service');
var font_service = require('../../../service/font_service');

/* index */
router.get('/list', function(req, res, next) {
	res.render('message/list', {opponents : res.opponents});
});

router.get('/form', function(req, res, next) {

    font_service.get_font_list(req.user.id).then(function(result) {

        var body = {
            result : result,
            font_list : result.font_list,
            editor_font_list : result.editor_font_list,
            opponents :res.opponents
        };

        res.render('message/form' , body);
    });
});

router.get('/to/:toUserId/timeline', function(req, res, next) {
	var render_data = { uid: req.user.id, opponents: res.opponents};
	var opponent_uid = req.params.toUserId;
	msgB_service.get_message_timeline(req.user.id, opponent_uid) // user
	.then(function(msgs){
		render_data.msgs = msgs;
		return msgB_service.get_name_from_id(opponent_uid);
	}).then(function(oppo_name){
		render_data.oppo_name = oppo_name.dataValues.name;
		res.render('message/timeline', render_data);
	}).catch(function(err) {
		console.log(err);
		next()
	});
});

router.get('/to/:sonmat_request_id', function(req, res, next) {
	var son_id = req.params.sonmat_request_id;
	msgB_service.get_message_from_id(son_id) // user
	.then(function(msg){
		res.render('message/detail', { 'msg': msg });
	}).catch(function(err) {
		console.log(err);
		next()
	});
});


module.exports = router;
