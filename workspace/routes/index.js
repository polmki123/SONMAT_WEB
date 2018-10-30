var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
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
