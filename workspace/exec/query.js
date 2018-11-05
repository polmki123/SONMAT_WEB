var models = require('../model');

function User_Following_Font(uid){
	return new Promise(function(resolve, reject){
		models.User_Following_Font.findAll({
			where: { user_id: uid },
		}).then(function(fonts) {
			resolve(fonts)
		}).catch(function(err) {
			reject(err);
		});
	});
};

function User_Purchased_Message_Background(uid){
	return new Promise(function(resolve, reject){
		models.User_Purchased_Message_Background.findAll({
			where: { user_id: uid },
		}).then(function(msg_bg) {
			resolve(msg_bg)
		}).catch(function(err) {
			reject(err);
		});
	});
};

var func = {}
func.User_Following_Font = User_Following_Font;
func.User_Purchased_Message_Background = User_Purchased_Message_Background;

module.exports = func;