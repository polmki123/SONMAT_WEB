var express = require('express');
var router = express.Router();

/* index */
router.get('/', function(req, res, next) {
    res.render('font/list', res.render_data);
});

router.get('/form', function(req, res, next) {
    res.render('font/form', res.render_data);
});


module.exports = router;
