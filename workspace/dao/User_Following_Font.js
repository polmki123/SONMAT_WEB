var models = require('../model');

function get_Following_Font(uid){
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

var func = {}
func.get_Following_Font = get_Following_Font;

module.exports = func;

