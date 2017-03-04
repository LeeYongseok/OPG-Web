var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}).sort({year:1}).exec(function(err, users){    // 1
  if(err) return res.json(err);
  res.render('member',
  { users: users,
    title: 'Member',
    main_menu: '멤버',
    path: 'member'});
  });
});

// edit
router.get("/edit", function(req, res){
  User.find({}).sort({year:1}).exec(function(err, users){    // 1
  if(err) return res.json(err);
  res.render('member_edit',
  { users: users,
    title: 'Member',
    main_menu: '멤버',
    path: 'member/edit'});
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
