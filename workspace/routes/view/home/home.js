var express = require('express');
var router = express.Router();
var msgB_service = require('../../../service/message_box_service')


/* index */
router.get('/', function(req, res, next) {
	msgB_service.get_opponents_name(req.user.id) // user
	.then(function(opponents){
		res.render('home/home', {'opponents' : opponents});		
	}).catch(function(err) {
		console.log(err);
		next()
	});
    // res.render('home/home');
});

router.get('/shutdown', function(req, res, next) {
    process.exit(0);
    //
})

router.get('/ping', function(req, res, next) {
    res.sendStatus(200);
})



module.exports = router;
