var express = require('express');
var router = express.Router();

router.get('/:item_no', function(req, res, next){
	num = req.params.item_no; // 여기로 저장된다
	res.render('index', { title: req.params.item_no, title2: 'Condition', is_check: true});
});

router.get('/:setting/:item_no', function(req, res, next){
	item = req.params.setting;
	num = req.params.item_no; // 여기로 저장된다

	res.render('item', { setting: item, num: num });
});

router.post('/get', function(req, res){
	console.log(req.body)
	text = req.body.texts
	console.log(text)

	res.redirect('/')
});
	

module.exports = router;
