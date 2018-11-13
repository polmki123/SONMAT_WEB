var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// need login using passport-XXXXX

var app = express();



function configApp() {

	app.set('views', path.join(__dirname, 'views/template'));
	app.set('view engine', 'ejs');

	// ejs-layouts setting
    app.set('layout', path.join(__dirname, 'views/template/layout/layout'));
    app.set("layout extractScripts", true);
    app.set("layout extractStyles", true);
    app.use(expressLayouts);

	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(require('./config/parsing'));

	app.use(require('./config/user')); // temporary user
/*
	app.use('/font', require('./routes/font')); // create, gallery
	app.use('/handwrite', require('./routes/handwrite')); // read write mailbox
	app.use('/messageBox', require('./routes/message_box')); // read write mailbox
	app.use('/user', require('./routes/user')); // user login logout register setting
	app.use('/', require('./routes/index')); // main*/
}

function viewRoute() {
	var VIEW_BASE_PATH = "./routes/view/";
    // home
	app.use('/', require(VIEW_BASE_PATH + 'home/home'));

	// account
    app.use('/account', require(VIEW_BASE_PATH + 'account/account'));

    // message
    app.use('/message', require(VIEW_BASE_PATH + 'message/message'));

    // font
    app.use('/font', require(VIEW_BASE_PATH + 'font/font'));

    // handwrite
    app.use('/handwrite', require(VIEW_BASE_PATH + 'handwrite/handwrite'));
}

function apiRoute() {
	//TODO not yet
}

configApp();
viewRoute();
apiRoute();

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
