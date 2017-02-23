var express = require('express');
var router = express.Router();
var passport= require("../config/passport");

router.get('/', function(req, res, next){
  // 마이페이지로 이동
});

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

module.exports = router;
