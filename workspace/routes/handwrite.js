var express = require('express');
var router = express.Router();
var models = require('../model');

router.get('/upload', function (req, res) {
    res.render('handwrite-upload');
});

router.post('/file', function(req, res) {

    res.send(req.body);

    //
});

router.get('/making/start', function(req, res) {
    res.render('font-making-start');
});

module.exports = router;