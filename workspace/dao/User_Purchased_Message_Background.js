var models = require('../model');

function get_Purchased_Message_Background(uid){
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
func.get_Purchased_Message_Background = get_Purchased_Message_Background;

module.exports = func;

