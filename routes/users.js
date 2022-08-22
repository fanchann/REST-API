var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hello world');
});

router.get('/me', function(req, res) {
    res.send('Hai This me')
})

module.exports = router;