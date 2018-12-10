var models = require('../model');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var date_format = require('./handler/date_format_handler');

function generate_temp_url(sonmat_request_id) {

    var SHARE_MESSAGE_TEMP_URL_PRIFIX = 'son-mat.com/message/share/';
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

function get_share_message(user_id) {

    return new Promise(function(resolve, reject){
        models.sonmat_request.findAll({
            include: [
                {
                    model: models.user,
                    as: 'From',
                    required : true,
                    attributes : ['name'],
                },{
                    model: models.sonmat,
                    required : true,
                    attributes : ['message_id', 'font_id'],
                    include:[
                        {
                            model: models.message,
                            required : true,
                            attributes : ['title', 'contents'],
                        }
                    ]
                }
            ],
            where: {
                $and:[
                    { from_user_id: user_id,
                        to_user_id: null,
                        share_url: {
                            [Op.ne]: null
                        }
                    },
                ]
            },
            order: [['send_date', 'DESC']], // index 0 is new, index 1 is old (if DESC)
            // limit: 5
        }).map(msg => msg.get({ plain: true }))
            .then(function(msgs) {
                msgs.forEach(function(msg){
                    msg.send_date = date_format.format_date(msg.send_date);
                })
                resolve(msgs)
            }).catch(function(err) {
            reject(err);
        });
    });
}

var func = {}
func.generate_temp_url = generate_temp_url;
func.get_sonmat_request_id_from_url = get_sonmat_request_id_from_url;
func.get_share_message = get_share_message;
module.exports = func;
