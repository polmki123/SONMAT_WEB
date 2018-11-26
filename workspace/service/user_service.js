var models = require('../model');

function login_check(email, password){
	return new Promise(function(resolve, reject){
		models.user.findOne({
			where: {
				email: email,
			},
		}).then(function(user) {
			if(user == null){
				resolve({user: null, err: 'Email is not correct'});
			}else{
				user = user.get({ plain: true });
				if(user.password === password){
					resolve({user: user, err: null});
				} else {
					resolve({user: null, err: 'Password Mismatch'});
				}
			}
			
		}).catch(function(err) {
			reject(err);
		});
	});
};
function create_new_user(email, password, name){
	return new Promise(function(resolve, reject){
		models.user.create({
			email: email,
			password: password,
			name: name,
		}).then(function(user) {
			resolve(user.get({ plain: true }))
		}).catch(function(err) {
			reject(err);
		});
	});
};

function register_user(email, password, name){
	return new Promise(function(resolve, reject){
		models.user.findOne({
			where: {
				email: email,
			},
		}).then(function(user){
			if(user){
				resolve({user: null, err: 'Email is already exist'})
			}else{
				return create_new_user(email, password, name);
			}
		}).then(function(user) {
			resolve({user: user, err: null})
		}).catch(function(err) {
			reject(err);
		});
	});
};

var func = {}
func.login_check = login_check;
func.register_user = register_user;

module.exports = func;
