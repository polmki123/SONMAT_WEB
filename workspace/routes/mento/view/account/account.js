var express = require('express');
var router = express.Router();

/* index */
router.get('/sign-up', function(req, res, next) {
    res.render('account/signUp');
});


module.exports = router;
