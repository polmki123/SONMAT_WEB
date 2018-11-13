var express = require('express');
var router = express.Router();
var models = require('../../../model');

router.get('/', function (req, res) {

    res.render('handwrite/handwrite-upload');
});

router.get('/upload', function (req, res) {

    res.render('handwrite/handwrite-upload');
});

router.post('/file', function(req, res) {

    var body = {};
    body.user_id = req.body.user_id;

    models.font.create(body).then( function(result) {
        //res.json(result);

        // move directory

    }).catch( function(err) {
        console.error(err);
    });
});

router.get('/making/start', function(req, res) {

    res.render('handwrite/font-making-start');
});

module.exports = router;