var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var message_service = require('../../../service/message_service');

router.post('/', function(req, res) {
    console.log(req.body.email)
    console.log(req.body.title)
    console.log(req.body.contents)
    // message_service.
    
    res.send('3');
});



module.exports = router;