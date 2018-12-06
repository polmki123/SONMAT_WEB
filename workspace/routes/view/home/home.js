var express = require('express');
var router = express.Router();

/* index */
router.get('/', function(req, res, next) {
    res.render('home/home', res.render_data);
});

router.get('/shutdown', function(req, res, next) {
    process.exit(0);
})

router.get('/ping', function(req, res, next) {
    res.sendStatus(200);
})



module.exports = router;
