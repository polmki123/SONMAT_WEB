var express = require('express');
var router = express.Router();
var models = require('../model');
var query = require('../exec/query');

const Op = models.Sequelize.Op

router.get('/read', function(req, res) {

	models.Message.findAll({
		include: [
			{
				model: models.User, 
				as : "Sender", 
				required : false, 
				attributes : ['user_id'], 
			},
			{
				model: models.User, 
				as : "Receiver", 
				required : false, 
				attributes : ['user_id'], 
			},
		],
		attributes: ['sender_id','receiver_id'],
		where: {
			[Op.or]: [{sender_id: req.user.id}, {receiver_id: req.user.id}]
		},
		order: [['send_date', 'DESC']], // index 0 is new, index 1 is old (if DESC)
		limit: 5
	}).then(function(results) {
		opponent_users = [];

		results.forEach(function(item){
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
		res.json(results);	
		
	}).catch(function(err) {
		console.log('err', err)
		res.send(err);
	});
});

router.get('/read_detail/:user_id', function(req, res) {
	uid = req.params.user_id;
	models.Message.findAll({
		include: [
			{
				model: models.User,
				as: 'Sender',
				required : false, 
				attributes : ['user_id'], 
			},{
				model: models.User,
				as: 'Receiver',
				required : false, 
				attributes : ['user_id'], 
			}
		],
		where: {
			$or: [{
				$and:[
					{ sender_id: req.user.id, },
					models.Sequelize.literal("Receiver.user_id = '" + uid + "'"),
				]
			},{
				$and:[
					{ receiver_id: req.user.id },
					models.Sequelize.literal("Sender.user_id = '" + uid + "'"),
				]
			}]
		},
		order: [['send_date', 'DESC']], // index 0 is new, index 1 is old (if DESC)
		limit: 5
	}).then(function(results) {
		res.json(results);
	}).catch(function(err) {
		res.send(err);
	});
});



router.get('/write', function(req, res) {
	var font;
	var bg;

	query.User_Following_Font(req.user.id)
		.then(function(fonts){
			font = fonts;
			return query.User_Purchased_Message_Background(req.user.id)
		}).then(function(msg_bg){
			bg = msg_bg
			console.log(font)
			console.log(bg)
			res.render('write');

		}).catch(function(err){
			res.send(err);
		})



	// models.User_Following_Font.findAll({
	// 	where: { user_id: req.user.id },
	// }).then(function(fonts) {
	// 	font = fonts

	// 	models.User_Purchased_Message_Background.findAll({
	// 		where: { user_id: req.user.id },
	// 	}).then(function(msg_bg) {
	// 		console.log (fonts)
	// 		console.log (msg_bg)
			
	// 		res.json(results);

	// 	}).catch(function(err) {
	// 		res.send(err);
	// 	});
	// }).catch(function(err) {
	// 	res.send(err);
	// });

	// res.render('write');
});

router.post('/write', function(req,res) {

});

router.get('/mailbox', function(req, res) {
	res.render('mailbox');
});

module.exports = router;