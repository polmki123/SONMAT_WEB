var express = require('express');
var router = express.Router();

/* index */
router.get('/', function(req, res, next) {
    res.render('font/list');
});

router.get('/form', function(req, res, next) {
    res.render('font/form');
});


module.exports = router;
