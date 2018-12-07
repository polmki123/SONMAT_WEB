var models = require('../model');
var crypto = require('crypto');

var secret_salt = "SonmatZZang"

function make_secret_password(password){
	return crypto.pbkdf2Sync(password, secret_salt, 100, 64, 'sha256').toString('base64');
}

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
				if(user.password === make_secret_password(password)){
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
function form_validator(email, phone){
	var phoneExp = /^[0-9]+$/;
	var emailExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

	if (phoneExp.test(phone) && emailExp.test(email)){
		console.log(phoneExp.test(phone))
		console.log(emailExp.test(email))
		console.log(phoneExp.test(phone) && emailExp.test(email))
		return true;
	}else{
		console.log(phone)
		console.log(phoneExp.test(phone))
		console.log(emailExp.test(email))
		console.log(phoneExp.test(phone) && emailExp.test(email))
		return false;
	}
}

function create_new_user(email, password, name, phone){
	return new Promise(function(resolve, reject){
		models.user.create({
			email: email,
			password: make_secret_password(password),
			name: name,
			phone: phone,
		}).then(function(user) {
			resolve(user.get({ plain: true }))
		}).catch(function(err) {
			reject(err);
		});
	});
};

function register_user(email, password, name, phone){
	return new Promise(function(resolve, reject){
		if(!form_validator(email, phone))
			resolve({user: null, err: 'register form is not correct'})
		models.user.findOne({
			where: {
				email: email,
			},
		}).then(function(user){
			if(user){
				resolve({user: null, err: 'Email is already exist'})
			}else{
				return create_new_user(email, password, name, phone);
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
func.make_secret_password = make_secret_password;

module.exports = func;
