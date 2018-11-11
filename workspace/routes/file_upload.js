var express = require('express');
var fs = require('fs');
var router = express.Router();

router.post('/', function(req, res, next) {

    var input_file_path = req.files.file.path;
    var temp_dir_path_last_index = input_file_path.lastIndexOf("\\");
    var temp_dir_path = input_file_path.substring(0, temp_dir_path_last_index);

    var file_name = req.files.file.name.substring(0, req.files.file.name.lastIndexOf("\."));
    var file_extension = req.files.file.name.substring(req.files.file.name.lastIndexOf("\."));
    var new_file_path = temp_dir_path + "\\" + file_name + "_" + (new Date).getTime() + file_extension;

    fs.rename(input_file_path, new_file_path, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    var body = {};
    body.path = new_file_path;
    res.send(body);
});

module.exports = router;