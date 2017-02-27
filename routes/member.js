var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}).sort({admin:1}).exec(function(err, users){    // 1
  if(err) return res.json(err);
  res.render('member',
  { users: users,
    title: 'Member',
    main_menu: '멤버',
    path: 'member'});
  });
});

// show
router.get("/:name", function(req, res){
 User.findOne({name:req.params.name}, function(err, user){
  if(err) return res.json(err);
  res.render("member", {user: user});
 });
});

// edit
router.get("/:name/edit", function(req, res){
 User.findOne({name:req.params.name}, function(err, user){
  if(err) return res.json(err);
  res.render("member_edit", {user: user});
 });
});

// delete
router.delete("/:name", function(req, res){
 User.remove({name:req.params.name}, function(err){
  if(err) return res.json(err);
  res.redirect("/member");
 });
});

module.exports = router;
