var express = require('express');
var router = express.Router();
var User = require('../models/User');
var passport= require("../config/util");

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.flash("user")[0] || {};
  var errors = req.flash("errors")[0] || {};
  res.render('signUp', { title: 'OPG', user:user, errors:errors });
});


router.post('/', function(req, res, next){
  User.create(req.body, function(err, data){
    if(err){
      req.flash("user", req.body);
      req.flash("errors", util.parseError(err));
      return res.redirect("/signUp");
    }
    else{
      console.log(data);
    }
    res.redirect('/');
  });
});

module.exports = router;
