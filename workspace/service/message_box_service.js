var models = require('../model');

function get_opponents_name(uid){
	return new Promise(function(resolve, reject){
		models.sonmat_request.findAll({
			include: [
				{
					model: models.user, 
					as : "From", 
					required : true, 
					attributes : ['name'], 
				},
				{
					model: models.user, 
					as : "To", 
					required : true, 
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

function get_message_timeline(uid, opponent_uid){
	return new Promise(function(resolve, reject){
		models.sonmat_request.findAll({
			include: [
				{
					model: models.user,
					as: 'From',
					required : true, 
					attributes : ['name'], 
				},{
					model: models.user,
					as: 'To',
					required : true, 
					attributes : ['name'], 
				},{
					model: models.sonmat,
					required : true, 
					attributes : ['message_id', 'font_id'], 
					include:[
						{
							model: models.message,
							required : true, 
							attributes : ['title', 'contents'], 
						}
					]
				}
			],
			where: {
				$or: [{
					$and:[
						{ from_user_id: uid, 
							to_user_id: opponent_uid },
						// models.Sequelize.literal("Receiver.user_id = '" + opponent_uid + "'"),
					]
				},{
					$and:[
						{ from_user_id: opponent_uid, 
							to_user_id: uid },
						// models.Sequelize.literal("Sender.user_id = '" + opponent_uid + "'"),
					]
				}]
			},
			order: [['send_date', 'DESC']], // index 0 is new, index 1 is old (if DESC)
			// limit: 5
		}).then(function(msgs) {
			msgs_json = JSON.parse(JSON.stringify(msgs));
			resolve(msgs_json)
		}).catch(function(err) {
			reject(err);
		});
	});
};

var func = {}
func.get_opponents_name = get_opponents_name;
func.get_message_timeline = get_message_timeline;

module.exports = func;