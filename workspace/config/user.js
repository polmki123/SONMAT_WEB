var models = require('../model');

var user_setting = function(req,res,next) {
	models.User.find({
		where: {
			id : 1
		}
	}).then(function(usr) {
		req.user = usr.dataValues;
		// console.log(res.locals.user)
		next()
	}).catch(function(err) {
		res.send(err);
		next()
	});
}

module.exports = user_setting;