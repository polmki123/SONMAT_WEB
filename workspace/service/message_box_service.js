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
			attributes: ['from_user_id','to_user_id', 'send_date', 'read_state'],
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
				var found = false;
				opponent_users.forEach(function(user){
					if(user.id == id){
						found = true;
						if(oppo.read_state == 'unread'){
							user.count = user.count + 1;	
						}
					}
				});
				if(found == false){
					if(oppo.read_state == 'unread'){
						opponent_users.push({id: id, name: other, send_date: formatDate(oppo.send_date), count: 1})
					}else {
						opponent_users.push({id: id, name: other, send_date: formatDate(oppo.send_date), count: 0})
					}
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
					]
				},{
					$and:[
						{ from_user_id: opponent_uid, 
							to_user_id: uid },
					]
				}]
			},
			order: [['send_date', 'DESC']], // index 0 is new, index 1 is old (if DESC)
			// limit: 5
		}).then(function(msgs) {
			msgs.forEach(function(msg){
				msg.dataValues.send_date = formatDate(msg.dataValues.send_date);
			})
			msgs_json = JSON.parse(JSON.stringify(msgs));
			resolve(msgs_json)
		}).catch(function(err) {
			reject(err);
		});
	});
};


function get_message_from_id(son_id){
	return new Promise(function(resolve, reject){
		models.sonmat_request.find({
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
			where: { id: son_id },
		}).then(function(msg) {
			msg_json = JSON.parse(JSON.stringify(msg));
			msg_json.send_date = formatDate(msg.dataValues.send_date);
			resolve(msg_json)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function formatDate(date) {
    var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function get_name_from_id(user_id){
	return new Promise(function(resolve, reject){
		models.user.find({
			where: { id: user_id },
			attributes : ['name'], 
		}).then(function(name) {
			resolve(name)
		}).catch(function(err) {
			reject(err);
		});
	});
}

var func = {}
func.get_opponents_name = get_opponents_name;
func.get_message_timeline = get_message_timeline;
func.get_message_from_id = get_message_from_id;
func.get_name_from_id = get_name_from_id;

module.exports = func;