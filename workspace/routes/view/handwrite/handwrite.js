var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('handwrite/form', res.render_data);
});

router.get('/form', function (req, res) {

    res.render('handwrite/form' , res.render_data);
});

router.get('/making', function(req, res) {

    res.render('handwrite/making', res.render_data);
});

module.exports = router;