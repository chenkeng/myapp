var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  res.send({
    status:1,
    info:'this is from the / page !',
    content:'终于调试通了这个接口！'
  })

});

module.exports = router;
