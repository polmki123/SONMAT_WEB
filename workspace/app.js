var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// need login using passport-XXXXX

var app = express();

function configApp() {
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(require('./config/parsing'));

	app.use(require('./config/user')); // temporary user

	app.use('/font', require('./routes/font')); // create, gallery
	app.use('/letter', require('./routes/letter')); // read write mailbox
	app.use('/user', require('./routes/user')); // user login logout register setting
	app.use('/', require('./routes/index')); // main
}

configApp();

app.use(function(req, res, next) {
	next(createError(404));
});
app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
