var express = require('express');
var router = express.Router();
var User = require('../models/User');

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
      req.flash("errors", parseError(err));
      return res.redirect("/signUp");
    }
    else{
      console.log(data);
    }
    res.redirect('/');
  });
});

module.exports = router;

function parseError(errors){
 var parsed = {};
 if(errors.name == 'ValidationError'){
  for(var name in errors.errors){
   var validationError = errors.errors[name];
   parsed[name] = { message:validationError.message };
 } // mongoose에서 발생하는 validationError message를 변환
 }  else if(errors.code == "11000" ) {
   if(errors.errmsg.indexOf("id") > 0){
     parsed.id = { message:"이미 존재하는 아이디 입니다." };
   } else if(errors.errmsg.indexOf("tel") > 0){
     parsed.tel = { message:"이미 존재하는 번호 입니다." };
   } else if(errors.errmsg.indexOf("mail") > 0){
     parsed.mail = { message:"이미 존재하는 e-mail 입니다." };
   }
  // mongoDB에서 id의 error를 처리
 }  else {
  parsed.unhandled = JSON.stringify(errors);
 }
 return parsed;
}
