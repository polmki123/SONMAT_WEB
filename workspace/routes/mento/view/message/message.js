var express = require('express');
var router = express.Router();

/* index */
router.get('/', function(req, res, next) {
    res.render('message/list');
});

router.get('/form', function(req, res, next) {
    res.render('message/form');
});

router.get('/to/:toUserId/timeline', function(req, res, next) {
    res.render('message/timeline');
});

router.get('/to/:toUserId/:messageId', function(req, res, next) {
    res.render('message/detail');
});


module.exports = router;
