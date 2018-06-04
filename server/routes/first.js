var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.send({
        status:1,
        info:"this is from the index interface"
    })
});

module.exports = router;
