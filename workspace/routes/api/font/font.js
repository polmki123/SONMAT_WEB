var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var models = require('../../../model');

router.post('/', function(req, res) {

    var body = {};
    body.user_id = req.body.user_id;

    models.font.create(body).then( function(result) {

        console.log("[font.js] insert font : ", result);

        /*// move directory
        var temp_file_path = body.file_path;
        var temp_dirname = path.dirname(temp_file_path);

        var dest_dirname = path.join(temp_dirname, '..', 'font');

        var file_name = req.files.file.name;
        var file_raw_name = file_name.substring(0, file_name.lastIndexOf("\."));
        var file_ext_name = path.extname(file_name);

        var new_file_path = dirname + file_raw_name + "_" + (new Date).getTime() + file_ext_name;

        fs.rename(input_file_path, new_file_path, function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });*/

        res.send(200);

    }).catch( function(err) {
        console.error(err);
    });
});

module.exports = router;