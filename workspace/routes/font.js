var express = require('express');
var router = express.Router();

/* GET home page. */
// create, gallery
router.get('/gallery', function(req, res) {

});

router.get('/create', function(req, res) {
	
});
router.get('/upload', function(req, res) {
	res.render('upload');
});
router.post('/upload', function(req, res) {
	console.log(req.files.image)
	res.redirect('/');
});

module.exports = router;