var models = require('../model');

function generate_temp_url(sonmat_request_id) {

    var SHARE_MESSAGE_TEMP_URL_PRIFIX = 'localhost:9000/share/';

    var temp_url = SHARE_MESSAGE_TEMP_URL_PRIFIX + generation_random_string();

    return new Promise(function(resolve, reject){
        models.sonmat_request.findOne({
            where: {
                id: sonmat_request_id,
            }
        }).then(function(sonmat_request) {
            return update_sonmat_url(sonmat_request.sonmat_id, temp_url);
        }).then(function() {
            resolve(temp_url);
        }).catch(function(err) {
            reject(err);
        });
    });
}

function update_sonmat_url(sonmat_id, share_url){
    return new Promise(function(resolve, reject){
        models.sonmat.update({
            share_url: share_url
        }, {
            where:{
                id: sonmat_id,
            }
        }).then(function(_) {
            resolve(share_url);
        }).catch(function(err) {
            reject(err);
        });
    });
};

function generation_random_string() {

    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });

    return uuid.toUpperCase();
}

var func = {}
func.generate_temp_url = generate_temp_url;

module.exports = func;
