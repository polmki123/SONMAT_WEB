var express = require('express');
var router = express.Router();
var UserFontService = require('../../../domain/user/font/UserFontService')
var userFontService = new UserFontService();

/* index */
router.get('/', function(req, res, next) {
    var loggedUser = res.loggedUser;
    var fontList = userFontService.getByUserId(loggedUser.id);
    var body = {
        fontList : fontList,
        opponents : res.opponents,
        loggedUser : loggedUser
    }

    res.render('font/list', body);
});

router.get('/form', function(req, res, next) {
    res.render('font/form', {opponents : res.opponents, loggedUser : res.loggedUser});
});


module.exports = router;
