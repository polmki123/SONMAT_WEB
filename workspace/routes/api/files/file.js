var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {

    var REPOSITORY_DIR_PATH = path.join(__dirname, '..', '..', '..', 'repository');

    var request_file_path = REPOSITORY_DIR_PATH + '/' + req.query.path;

    fs.readFile(request_file_path, function(err, data) {
        res.end(data);
    });
});

module.exports = router;