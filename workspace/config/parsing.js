var formidable = require('formidable');
var path = require('path');

var parsing = function(req,res,next) {
  var save_path = path.join(__dirname, '..', 'repository', 'temporary')
  var opts = {
    encoding: 'utf-8',
    uploadDir: save_path,
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