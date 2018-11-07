var models = require('../model');

function get_all_Font(){
	return new Promise(function(resolve, reject){
		models.Font.findAll()
		.then(function(font) {
			resolve(font)
		}).catch(function(err) {
			reject(err);
		});
	});
};

var func = {}
func.get_all_Font = get_all_Font;

module.exports = func;
