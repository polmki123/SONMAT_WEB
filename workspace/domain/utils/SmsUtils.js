'use strict';

var coolsms = require('node-coolsms');

coolsms.init({
    secret: 'O3PBLLO58ADYQKNGAJKTAS3AWHAUNM6V',
    key: 'NCSOBWW0C2HLCVE5',
});

var SmsUtils = {
    send: function (to , message) {
        if (message.length > 80) {
            this._sendLms(to , message);
        } else {    
            this._sendSms(to , message);
        }
    },
    _sendSms: function (to , message) {
        coolsms.send({
            to: to,
            from: '01026527549', // your number
            type: 'SMS',
            text: message,
        }, function (err, result) {
            console.log('result err=%s, result', err, result);
        });
    },

    _sendLms: function (to , message) {
        coolsms.send({
            to: to,
            from: '01026527549', // your number
            type: 'LMS',
            text: message,
        }, function (err, result) {
            console.log('result err=%s, result', err, result);
        });
    }
}

module.exports = SmsUtils;