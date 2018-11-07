var models = require('../model');

function get_all_User(){
	return new Promise(function(resolve, reject){
		models.User.findAll()
		.then(function(user) {
			resolve(user)
		}).catch(function(err) {
			reject(err);
		});
	});
};

var func = {}
func.get_all_User = get_all_User;

module.exports = func;

