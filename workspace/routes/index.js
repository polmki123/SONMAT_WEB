var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	// 메인 페이지를 보여준다.

	// DB 를 쿼리할 필요가 없어보인다. 
	res.render('index');
});

router.get('/shutdwon', function(req, res) {
	process.exit(0);
	//
})

router.get('/ping', function(req, res) {
	res.sendStatus(200);
})

module.exports = router;
