var express = require('express');
var router = express.Router();
var font_service = require('../../../service/font_service');

/* index */
router.get('/form', function(req, res, next) {
     res.render('font/form', res.render_data);
});

router.get('/', function(req, res, next) {
	
	res.render_data.uid = req.user.id;

	font_service.my_font_gallery(req.user.id) // user
	.then(function(font){
        res.render_data.font = font;
		res.render('font/list', res.render_data);

	}).catch(function(err) {
		console.log(err);
		next()
	});
});

router.get('/:font_id', function(req, res, next) {
	var fon_id = req.params.font_id;
	font_service.my_font_gallery(fon_id)
	.then(function(font){
		res.render_data.font = font;
	}).then(function(font_list) {
        res.render('font/detail', res.render_data);
    }).catch(function(err) {
		console.log(err);
		next()
	});
});

module.exports = router;


