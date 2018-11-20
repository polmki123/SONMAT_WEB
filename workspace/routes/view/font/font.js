var express = require('express');
var router = express.Router();

/* index */
router.get('/', function(req, res, next) {
    res.render('font/list', {opponents : res.opponents , loggedUser : res.loggedUser});
});

router.get('/form', function(req, res, next) {
    res.render('font/form', {opponents : res.opponents, loggedUser : res.loggedUser});
});


module.exports = router;
