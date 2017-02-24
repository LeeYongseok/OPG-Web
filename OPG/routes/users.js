var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
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
  User.findOne({_id:req.params.id}, function(err, user){
  if(err) return res.json(err);
  res.render("mypage",
  { user:user,
    title:'My Page',
    main_menu:'마이 페이지',
    path:'/user/:id'});
 });
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
   if(err) return res.json(err);
   res.redirect("/user/"+req.params.id);
  });
});
});



module.exports = router;
