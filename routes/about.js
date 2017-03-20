var express = require('express');
var router = express.Router();
var util = require('../config/util.js');

router.get('/', function(req, res, next) {
	if(!req.user){
		req.session.redirectTo= '/about';
	}
	var user = req.flash("user")[0];
	var errors = req.flash("errors")[0] || {};
  util.isPossibleAccesse(errors, res);
  res.render('about', {
    title: '소개'
  });
});

module.exports = router;
