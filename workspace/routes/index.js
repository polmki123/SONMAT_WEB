var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express', title2: 'Condition', is_check: true});
});
router.get('/false', function(req, res, next) {
	res.render('index', { title: 'Express', title2: 'Condition', is_check: false});
});
router.get('/text', function(req, res, next){
	res.render('template/shop-cart');
})

module.exports = router;
