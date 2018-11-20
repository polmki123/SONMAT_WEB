'use strict';

var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'headcha',
    api_key: '249477793226939',
    api_secret: '_AHLL-IAjp8dAPVOo_rDcIC6fk0'
});

var FileUtils =  {
    upload : function (filePath , fnCallback) {
        cloudinary.v2.uploader.upload(filePath, function(error, result) {
            if (fnCallback)
                fnCallback(result);
            console.log(result, error);
        });

    }
}


module.exports = FileUtils;