var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var models = require('../../../model');

router.post('/', function(req, res) {

    var font = {};
    font.user_id = req.user.id;

    models.font.create(font).then( function(result) {

        // move directory
        var temp_file_path = req.body.file_path;
        var temp_dirname = path.dirname(temp_file_path);

        var dest_dirname = path.join(temp_dirname, '..', 'font', result.dataValues.id.toString());
        var dest_file_path = dest_dirname + "\\handwrite" + path.extname(temp_file_path);

        // create new directory : (repository_path)/font/{font_id}
        if (!fs.existsSync(dest_dirname)) {
            fs.mkdirSync(dest_dirname);
        }

        // move file
        fs.rename(temp_file_path, dest_file_path, function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });

        res.send(200);

    }).catch( function(err) {
        console.error(err);
    });
});

module.exports = router;