var express = require('express');
var router = express.Router();

router.get('/:item_no', function(req, res, next){
	num = req.params.item_no; // 여기로 저장된다
	res.render('index', { title: req.params.item_no, title2: 'Condition', is_check: true});
});
router.get('/:setting/:item_no', function(req, res, next){
	item = req.params.setting;
	num = req.params.item_no;
	res.render('item', { setting: item, num: num });
});
router.post('/body_use', function(req, res){
	console.log(req.body);
	text = req.body.texts;
	console.log(text);

	res.redirect('/');
});

router.post('/image_use', function(req, res){
	console.log(req.files.imageName);
	res.redirect('/');
});

// url /query_use?item_no=1	
router.get('/query_use', function(req, res, next) {
	console.log(req.query.item_no);
	res.render('index', { title: 'Express', title2: 'Condition', is_check: false});
});

router.get('/template_use', function(req, res, next){
	res.render('template/shop-cart');
})