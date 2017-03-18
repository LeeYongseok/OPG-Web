var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if(!req.user){
		req.session.redirectTo= '/about';
	}
  res.render('about', {
    title: '소개'
  });
});

module.exports = router;
