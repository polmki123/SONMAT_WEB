'use strict';

var font_service = require('../../../service/font_service');
var http = require('http');

function findNewByUserId(user_id) {
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
};

function checkedByUserId(user_id) {
    return new Promise(function(resolve, reject){
        font_service.checked_by_userid(user_id)
        .then(function(result){
            resolve(true);
        }).catch(function(err) {
            console.log(err);
        });
    });
};


function createNewFont(user, body) {

    // create new font item,
    // server communication with deep-server
    // request (font_id)

    font_service.create_new_font(user.id, body)
    .then(function(font){

        var options = {
            //hostname: '106.10.36.130',
            hostname: '10.41.60.220',
            port: 9000,
            path: '/font/make',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var req = http.request(options, function (res) {

            var responseString = "";

            res.on("data", function (data) {
                responseString += data;
                // save all the data from response
            });
            res.on("end", function () {
                console.log(responseString);
                // print to console when response ends
            });
        });

        // add user phone number to body
        //console.log("<< user >> : ", JSON.stringify(user));

        var body = {};
        body.id = font.id;
        body.user_id = font.user_id;
        body.handwrite_image_path = font.handwrite_image_path;
        body.phone = user.phone;

        //console.log("<< font >> : ", JSON.stringify(body));

        req.write(JSON.stringify(body));
        req.end();

    }).catch(function(err) {
        console.log(err);
    });
};

var FontRepository = {}

FontRepository.findNewByUserId = findNewByUserId;
FontRepository.checkedByUserId = checkedByUserId;
FontRepository.createNewFont = createNewFont;

module.exports = FontRepository;