var models = require('../model');

function find_new_by_userid(user_id){
	return new Promise(function(resolve, reject){
		models.font.findAll({
			where: {
				user_id: user_id,
				read_state: 'unread',
				making_status: 'complete',
			},
			order: [['making_date', 'DESC']],
		})
		.then(function(fonts) {
			fonts_json = JSON.parse(JSON.stringify(fonts));
			resolve(fonts_json)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function checked_by_userid(user_id){
	return new Promise(function(resolve, reject){
		models.font.update({read_state: 'read'},
		{
			where: {
				user_id: user_id,
				read_state: 'unread',
				making_status: 'complete',
			},
		})
		.then(function(result) {
			resolve(result)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function create_new_font(user_id){
	return new Promise(function(resolve, reject){
		models.font.create({user_id: user_id})
		.then(function(font) {
			resolve(font)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function notify_complete(font_id){
	return new Promise(function(resolve, reject){
		models.font.update({making_status: 'complete'},
		{
			where: {
				id: font_id,
			},
		})
		.then(function(result) {
			resolve(result)
		}).catch(function(err) {
			reject(err);
		});
	});
};


var func = {}
func.find_new_by_userid = find_new_by_userid;
func.checked_by_userid = checked_by_userid;
func.create_new_font = create_new_font;
func.notify_complete = notify_complete;

module.exports = func;
