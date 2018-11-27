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
		}).map(opponent => opponent.get({ plain: true }))
		.then(function(opponents) {

			opponent_users = [];
			opponents.forEach(function(oppo){
				if(oppo.from_user_id != uid) {
					other = oppo.From.name;
					id = oppo.from_user_id;
				}else {
					other = oppo.To.name;
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
		}).map(msg => msg.get({ plain: true }))
		.then(function(msgs) {
			msgs.forEach(function(msg){
				msg.send_date = formatDate(msg.send_date);
			})
			resolve(msgs)
		}).catch(function(err) {
			reject(err);
		});
	});
};


function get_message_from_id(son_id){
	return new Promise(function(resolve, reject){
		models.sonmat_request.findOne({
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
							attributes : ['title', 'contents', 'contents_html'],
						}
					]
				}
			],
			where: { id: son_id },
		}).then(function(msg) {
			msg_json = msg.get({ plain: true });
			msg_json.send_date = formatDate(msg.dataValues.send_date);
			resolve(msg_json)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function formatDate(date_time){
    var yyyy = date_time.getFullYear().toString();
    var MM = pad(date_time.getMonth() + 1,2);
    var dd = pad(date_time.getDate(), 2);
    var hh = pad(date_time.getHours(), 2);
    var mm = pad(date_time.getMinutes(), 2)
    var ss = pad(date_time.getSeconds(), 2)
    return yyyy+'/'+MM+'/'+dd+' '+hh+':'+mm;
}
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function get_name_from_id(user_id){
	return new Promise(function(resolve, reject){
		models.user.findOne({
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