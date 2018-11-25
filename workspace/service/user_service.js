var models = require('../model');

function login_check(email, password){
	return new Promise(function(resolve, reject){
		models.user.find({
			where: {
				email: email,
			},
		}).then(function(user) {
			if(user == null){
				resolve(null, 'Email is not correct');
			}else{
				user = user.get({ plain: true });
				if(user.password === password){
					resolve(user, null);
				} else {
					resolve(null, 'Password Mismatch');
				}
			}
			
		}).catch(function(err) {
			reject(err);
		});
	});
};
function create_new_user(email, password){
	return new Promise(function(resolve, reject){
		models.user.create({
			email: email,
			password: password,
			name: "",
		}).then(function(user) {
			resolve(user.get({ plain: true }))
		}).catch(function(err) {
			reject(err);
		});
	});
};

function register_user(email, password){
	return new Promise(function(resolve, reject){
		models.user.find({
			where: {
				email: email,
			},
		}).then(function(user){
			if(user){
				resolve(null, 'Email is already exist')
			}else{
				return create_new_user(email, password);
			}
		}).then(function(user) {
			resolve(user, null)
		}).catch(function(err) {
			reject(err);
		});
	});
};

var func = {}
func.login_check = login_check;
func.login_check = login_check;
func.login_check = login_check;
func.login_check = login_check;

module.exports = func;
