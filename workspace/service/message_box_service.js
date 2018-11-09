var models = require('../model');

function get_Opponents_name(uid){
	return new Promise(function(resolve, reject){
		models.sonmat_request.findAll({
			include: [
				{
					model: models.user, 
					as : "From", 
					required : false, 
					attributes : ['name'], 
				},
				{
					model: models.user, 
					as : "To", 
					required : false, 
					attributes : ['name'], 
				},
			],
			attributes: ['from_user_id','to_user_id'],
			where: {
				$or: [{from_user_id: uid}, {to_user_id: uid}]
			},
			order: [['send_date', 'DESC']], // index 0 is new, index 1 is old (if DESC)
		}).then(function(opponents) {

			opponent_users = [];
			opponents.forEach(function(oppo){
				if(oppo.from_user_id != uid) {
					other = oppo.From.dataValues.name;
					id = oppo.from_user_id;
				}else {
					other = oppo.To.dataValues.name;
					id = oppo.to_user_id;
				}
				if(!opponent_users.includes(other)){
					opponent_users.push({id: id, name: other})
				}
			});
			
			resolve(opponent_users)
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
func.get_Opponents_name = get_Opponents_name;
func.get_Message_with_user = get_Message_with_user;

module.exports = func;