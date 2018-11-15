var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

router.post('/upload', function(req, res, next) {
    debugger;
    var input_file_path = req.files.file.path;
    var dirname = path.dirname(input_file_path);

    var file_name = req.files.file.name;
    var file_raw_name = file_name.substring(0, file_name.lastIndexOf("\."));
    var file_ext_name = path.extname(file_name);

    var new_file_path = dirname + "\\" + file_raw_name + "_" + (new Date).getTime() + file_ext_name;

    fs.rename(input_file_path, new_file_path, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    var body = {};
    body.path = new_file_path;

    console.log("[file.js] file received : ", new_file_path);
    res.send(body);
});

module.exports = router;