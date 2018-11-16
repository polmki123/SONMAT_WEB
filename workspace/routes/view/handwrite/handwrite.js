var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('handwrite/form', {opponents : res.opponents});
});

router.get('/form', function (req, res) {

    res.render('handwrite/form' , {opponents : res.opponents});
});

router.get('/making', function(req, res) {

    res.render('handwrite/making', {opponents : res.opponents});
});

module.exports = router;