var express = require('express');
var router = express.Router();
var User=require('../models/User');
var passport= require("../config/passport");

router.post('/login', function(req,res,next){
    var errors = {};
    var isValid = true;
    if(!req.body.id){
     isValid = false;
     errors.id = "ID is required!";
    }
    if(!req.body.password){
     isValid = false;
     errors.password = "Password is required!";
    }

    if(isValid){
     next();
    } else {
     req.flash("errors",errors);
     console.log(errors);
     res.redirect("/");
    }
   },
   passport.authenticate("local-login", {
    successRedirect : "/",
    failureRedirect : "/signUp"
   }
 ));

 router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
 });

router.get('/:id', function(req, res, next){
  var user = req.flash("user")[0];
  var errors = req.flash("errors")[0] || {};
  if(!user){
  User.findOne({_id:req.params.id}, function(err, user){
  if(err) return res.json(err);
  res.render("mypage",
  { user:user,  errors : errors, title:'My Page',
    main_menu:'마이 페이지', path:'/user/:id'});
 });
}
 else {
   res.render("mypage", {user:user, errors: errors, title:'My Page',
   main_menu:'마이 페이지',  path:'/user/:id'}); // 정보 변경시 오류 발생하면 원래 페이지로
  }
});

router.put("/:id",function(req, res, next){

   User.findOne({_id:req.params.id})
   .select("password")
   .exec(function(err, user){
    if(err) return res.json(err);

    // update user object
    user.originalPassword = user.password;
    user.password = req.body.newPassword? req.body.newPassword : user.password;
    for(var p in req.body){
     user[p] = req.body[p];
    }
    // save updated user
    user.save(function(err, user){
    if(err){
      req.flash("user", req.body);
      req.flash("errors", parseError(err));
      return res.redirect("/user/"+req.params.id);
     }
     res.redirect("/user/"+req.params.id);
    });
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
 } else if(errors.code == "11000" ) {
   if(errors.errmsg.indexOf("id") > 0){
     parsed.id = { message:"이미 존재하는 아이디 입니다." };
   } else if(errors.errmsg.indexOf("tel") > 0){
     parsed.tel = { message:"이미 존재하는 번호 입니다." };
   } else if(errors.errmsg.indexOf("mail") > 0){
     parsed.mail = { message:"이미 존재하는 e-mail 입니다." };
   }
  // mongoDB에서 id의 error를 처리
 } else {
  parsed.unhandled = JSON.stringify(errors);
 }
 return parsed;
}
