var models = require('../model');

function get_all_Message(){
	return new Promise(function(resolve, reject){
		models.Message.findAll()
		.then(function(msg) {
			resolve(msg)
		}).catch(function(err) {
			reject(err);
		});
	});
};

var func = {}
func.get_all_Message = get_all_Message;
module.exports = func;
