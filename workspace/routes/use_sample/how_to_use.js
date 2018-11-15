var express = require('express');
var router = express.Router();

router.get('/:item_no', function(req, res, next){
	num = req.params.item_no; // 여기로 저장된다
	res.render('index', { title: req.params.item_no, title2: 'Condition', is_check: true});
});
router.get('/:setting/:item_no', function(req, res, next){
	item = req.params.setting;
	num = req.params.item_no;
	res.render('item', { setting: item, num: num });
});
router.post('/body_use', function(req, res){
	console.log(req.body);
	text = req.body.texts;
	console.log(text);

	res.redirect('/');
});

router.post('/image_use', function(req, res){
	console.log(req.files.imageName);
	res.redirect('/');
});

// url /query_use?item_no=1	
router.get('/query_use', function(req, res, next) {
	console.log(req.query.item_no);
	res.render('index', { title: 'Express', title2: 'Condition', is_check: false});
});

router.get('/template_use', function(req, res, next){
	res.render('template/shop-cart');
})

function get_user_from_id(user_id){
	return new Promise(function(resolve, reject){
		models.user.find({
			where: { id: user_id }
		}).then(function(usr){
			resolve(usr)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function get_message_from_id(msg_id, opponent_uid){
	var msg_result;
	return new Promise(function(resolve, reject){
		models.message.find({
			where: { id: msg_id }
		}).then(function(msg) {
			msg_result = msg.dataValues;
			return get_user_from_id(opponent_uid)
		}).then(function(usr) {
			if(msg_result.user_id == usr.id){
				msg_result.From = usr.name;
				msg_result.To = "";
			}else{
				msg_result.From = "";
				msg_result.To = usr.name;
			}
			resolve(msg_result);
		}).catch(function(err) {
			reject(err);
		});
	});
};