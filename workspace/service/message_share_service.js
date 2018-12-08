var models = require('../model');

function generate_temp_url(sonmat_request_id) {

    var SHARE_MESSAGE_TEMP_URL_PRIFIX = 'localhost:9000/message/share/';
    var temp_url = generation_random_string();

    return new Promise(function(resolve, reject){
        models.sonmat_request.update({
            share_url: temp_url
        }, {
            where:{
                id: sonmat_request_id,
            }
        }).then(function(_) {
            resolve(SHARE_MESSAGE_TEMP_URL_PRIFIX + temp_url);
        }).catch(function(err) {
            reject(err);
        });
    });
}

function generation_random_string() {

    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });

    return uuid.toUpperCase();
}

function get_sonmat_request_id_from_url(temp_url) {

    return new Promise(function(resolve, reject){
        models.sonmat_request.findOne({
            where: {
                share_url: temp_url,
            }
        }).then(function(sonmat_request) {
            resolve(sonmat_request.id);
        }).catch(function(err) {
            reject(err);
        });
    });
}

var func = {}
func.generate_temp_url = generate_temp_url;
func.get_sonmat_request_id_from_url = get_sonmat_request_id_from_url;
module.exports = func;
