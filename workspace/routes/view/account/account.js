var express = require('express');
var router = express.Router();

/* index */
router.get('/sign-up', function(req, res, next) {
    res.render('account/signUp' , res.render_data);
});

router.get('/sign-in', function(req, res, next) {
    res.render('account/signIn' , res.render_data);
});

router.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;
