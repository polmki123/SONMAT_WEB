var express = require('express');
var router = express.Router();
var models = require('../model');

var User_Following_Font = require('../dao/User_Following_Font');
var User_Purchased_Message_Background = require('../dao/User_Purchased_Message_Background');
var Message = require('../dao/Message');

var Op = models.Sequelize.Op

router.get('/read', function(req, res) {

	Message.get_User_name(req.user.id)
		.then(function(opponents){
			opponent_users = [];

			opponents.forEach(function(item){
				if(item.sender_id != req.user.id) {
					other = item.Sender.dataValues.user_id;
					id = item.sender_id;
				}else {
					other = item.Receiver.dataValues.user_id;
					id = item.receiver_id;
				}
				if(!opponent_users.includes(other)){
					opponent_users.push({id: id, name: other})
				}
			})

			console.log(opponent_users)
			res.json(opponents);	
		}).catch(function(err){
			res.send(err);
		});

});

router.get('/read_detail/:user_id', function(req, res) {
	opponent_uid = req.params.user_id;

	Message.get_Message_with_user(req.user.id, opponent_uid)
		.then(function(msgs){
			res.json(msgs);
		}).catch(function(err){
			res.send(err);
		});
});



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