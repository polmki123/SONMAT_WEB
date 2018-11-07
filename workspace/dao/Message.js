var models = require('../model');

function get_all_Message(){
	return new Promise(function(resolve, reject){
		models.Message.findAll()
		.then(function(msg) {
			resolve(msg)
		}).catch(function(err) {
			reject(err);
		});
	});
};
function get_User_name(uid){
	return new Promise(function(resolve, reject){
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
				[Op.or]: [{sender_id: uid}, {receiver_id: uid}]
			},
			order: [['send_date', 'DESC']], // index 0 is new, index 1 is old (if DESC)
		}).then(function(opponents) {
			resolve(opponents)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function get_Message_with_user(uid, opponent_uid){
	return new Promise(function(resolve, reject){
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
						{ sender_id: uid, },
						models.Sequelize.literal("Receiver.user_id = '" + opponent_uid + "'"),
					]
				},{
					$and:[
						{ receiver_id: uid },
						models.Sequelize.literal("Sender.user_id = '" + opponent_uid + "'"),
					]
				}]
			},
			order: [['send_date', 'DESC']], // index 0 is new, index 1 is old (if DESC)
			// limit: 5
		}).then(function(msg) {
			resolve(msg)
		}).catch(function(err) {
			reject(err);
		});
	});
};

var func = {}
func.get_all_Message = get_all_Message;
func.get_User_name = get_User_name;
func.get_Message_with_user = get_Message_with_user;

module.exports = func;

