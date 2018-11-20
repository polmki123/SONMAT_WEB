var express = require('express');
var router = express.Router();

/* index */
router.get('/sign-up', function(req, res, next) {
    res.render('account/signUp' , {
        loggedUser : res.loggedUser
    });
});

router.get('/sign-in', function(req, res, next) {
    res.render('account/signIn' , {
        loggedUser : res.loggedUser
    });
});

module.exports = router;
