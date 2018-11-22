var models = require('../model');

function create_new_message(body){
	return new Promise(function(resolve, reject){
		models.message.create({
			user_id: body.user_id,
			title: body.title,
			contents: body.contents,
            contents_html: body.contents_html
		}).then(function(msg){
			resolve(msg)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function create_new_sonmat(msg_id, font_id){
	return new Promise(function(resolve, reject){
		models.sonmat.create({
			message_id: msg_id,
			font_id: font_id,
		}).then(function(sonmat){
			resolve(sonmat)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function create_new_sonmat_request(sonmat_id, opponent_id, user_id){
	var now_date = new Date();
	return new Promise(function(resolve, reject){
		models.sonmat_request.create({
			from_user_id: user_id,
			to_user_id: opponent_id,
			sonmat_id: sonmat_id,
			send_date: now_date,
		}).then(function(sonmat_request){
			resolve(sonmat_request);
		}).catch(function(err) {
			reject(err);
		});
	});
};

function send_message(body){
	return new Promise(function(resolve, reject){
		models.user.find({
			where: {
				email: body.email,
			},
		}).then(function(opponent){
			body.opponent_id = opponent.dataValues.id;
			return create_new_message(body);
		}).then(function(msg) {
			return create_new_sonmat(msg.dataValues.id, body.font_id);
		}).then(function(sonmat) {
			return create_new_sonmat_request(sonmat.dataValues.id, body.opponent_id, body.user_id);
		}).then(function(sonmat_request) {
			resolve(sonmat_request.dataValues.id);
		}).catch(function(err) {
			reject(err);
		});
	});
};

function find_user_by_email(email){
	return new Promise(function(resolve, reject){
		models.user.find({
			where: {
				email: email,
			},
		}).then(function(user) {
			resolve(user);
		}).catch(function(err) {
			reject(err);
		});
	});
};

var func = {}
func.send_message = send_message;
func.find_user_by_email = find_user_by_email;

module.exports = func;
