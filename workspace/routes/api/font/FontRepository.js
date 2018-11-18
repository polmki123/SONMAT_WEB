'use strict';

var FontRepository = function () {}
var font_service = require('../../../service/font_service');
var path = require('path');
var fs = require('fs');


FontRepository.prototype =  {

    findNewByUserId : function(user_id) {
        return new Promise(function(resolve, reject){
            font_service.find_new_by_userid(user_id)
            .then(function(fonts){
                var body = {};
                body.fontList = fonts;
                resolve(body);
            }).catch(function(err) {
                console.log(err);
            });
        });
    },

    checkedByUserId: function (user_id) {
        return new Promise(function(resolve, reject){
            font_service.checked_by_userid(user_id)
            .then(function(result){
                resolve(true);
            }).catch(function(err) {
                console.log(err);
            });
        });
    },

    createNewFont: function (user_id, file_path) {
        // create new font item, 
        // server communication with deep-server
        // request (font_id)
        font_service.create_new_font(user_id)
        .then(function(font){

            var temp_file_path = file_path;
            var temp_dirname = path.dirname(temp_file_path);

            var base_dirname = path.join(temp_dirname, '..', 'font');
            var dest_dirname = path.join(temp_dirname, '..', 'font', font.dataValues.id.toString());
            var dest_file_path = dest_dirname + "\\handwrite" + path.extname(temp_file_path);

            // create new directory : (repository_path)/font
            if (!fs.existsSync(base_dirname)) {
                fs.mkdirSync(base_dirname, { recursive: true });
            }

            // create new directory : (repository_path)/font/{font_id}
            if (!fs.existsSync(dest_dirname)) {
                fs.mkdirSync(dest_dirname, { recursive: true });
            }

            // move file
            fs.rename(temp_file_path, dest_file_path, function(err) {
                if ( err ) console.log('ERROR: ' + err);
            });

            setTimeout(function () {
                console.log('here')
                console.log(font.dataValues)
                console.log('here')
                font_service.notify_complete(font.dataValues.id)
                .then(function(result){
                    return true;
                }).catch(function(err) {
                    console.log(err);
                });
            } , 5000 , 'test');

        }).catch(function(err) {
            console.log(err);
        });
    },
};

module.exports = FontRepository;