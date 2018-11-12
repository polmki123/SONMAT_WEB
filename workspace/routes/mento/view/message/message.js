var express = require('express');
var router = express.Router();

/* index */
router.get('/', function(req, res, next) {
    res.render('message/list');
});

router.get('/form', function(req, res, next) {
    res.render('message/form');
});


module.exports = router;
