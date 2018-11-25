var express = require('express');
var router = express.Router();

/* index */
router.get('/sign-up', function(req, res, next) {
    res.render('account/signUp' , {
        loggedUser : req.user
    });
});

router.get('/sign-in', function(req, res, next) {
    res.render('account/signIn' , {
        loggedUser : req.user
    });
});

module.exports = router;
