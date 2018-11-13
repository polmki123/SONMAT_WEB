var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

    res.render('handwrite/form');
});

router.get('/form', function (req, res) {

    res.render('handwrite/form');
});

router.get('/making', function(req, res) {

    res.render('handwrite/making');
});

module.exports = router;