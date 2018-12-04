'use strict';

var coolsms = require('node-coolsms');

coolsms.init({
    secret: 'D67A7C54C698A159F6D3C1DE37899351',
    key: 'NCS57A021B18D599',
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
            from: '01067021755', // your number
            type: 'SMS',
            text: message,
        }, function (err, result) {
            console.log('result err=%s, result', err, result);
        });
    },

    _sendLms: function (to , message) {
        coolsms.send({
            to: to,
            from: '01067021755', // your number
            type: 'LMS',
            text: message,
        }, function (err, result) {
            console.log('result err=%s, result', err, result);
        });
    }
}

module.exports = SmsUtils;