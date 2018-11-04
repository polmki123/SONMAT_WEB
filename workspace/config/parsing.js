var formidable = require('formidable');

var parsing = function(req,res,next) {
  var opts = {
    encoding: 'utf-8',
    uploadDir: './public/repository',
    //  with epoch time
    multiples: true,
  }
  const form = new formidable.IncomingForm();
  Object.assign(form, opts);
  form.parse(req, (err, body, files) => {
    if (err) {
      next(err);
      return;
    }
    Object.assign(req, { body, files });
    next();
  });  
}

module.exports = parsing;