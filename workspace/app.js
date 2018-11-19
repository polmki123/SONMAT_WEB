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

}

var msgB_service = require('./service/message_box_service');



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

    var API_BASE_PATH = "./routes/api/";

    // file
    app.use('/api/files', require(API_BASE_PATH + 'files/file'));

    // font
    app.use('/api/font', require(API_BASE_PATH + 'font/font'));

    // message
    app.use('/api/message', require(API_BASE_PATH + 'message/message'));

}

configApp();

app.use(function(req, res, next) {

    msgB_service.get_opponents_name(req.user.id) // user
        .then(function(opponents){
            res.opponents = opponents;
            next();
        }).catch(function(err) {
        console.log(err);
    });
});

viewRoute();
apiRoute();

app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
