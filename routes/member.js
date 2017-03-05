var express = require('express');
var router = express.Router();
var User = require('../models/User');
var util = require('../config/util.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var limit = 15;
    var page = req.query.page;
    if(page === undefined) {page = 1;}
    page = parseInt(page);
  User.count({},function(err, count){
    if(err) return res.json({success:false, message:err});
    var skip = (page-1)*limit;
    var maxPageNum = Math.ceil(count/limit);
    User.find({}).sort({year:1}).skip(skip).limit(limit).exec(function(err, users){
    if(err) return res.json({success:false, message:err});
    res.render('member',
    { users: users,
      title: 'Member',
      main_menu: '멤버',
      page:page,
			maxPageNum:maxPageNum,
      path: 'member'});
    });
  });
});

// edit
router.get("/edit",util.isadminOne, function(req, res){
  var limit = 15;
    var page = req.query.page;
    if(page === undefined) {page = 1;}
    page = parseInt(page);
  User.count({},function(err, count){
    if(err) return res.json({success:false, message:err});
    var skip = (page-1)*limit;
    var maxPageNum = Math.ceil(count/limit);
    User.find({}).sort({year:1}).skip(skip).limit(limit).exec(function(err, users){    // 1
    if(err) return res.json({success:false, message:err});
    res.render('member',
    { users: users,
      title: 'Member',
      main_menu: '멤버',
      page:page,
			maxPageNum:maxPageNum,
      path: 'member/edit'});
    });
  });
});

router.put("/:id",function(req, res, next){
      var Admin=4;
      if(req.body.grade === '관리자'){
        Admin = 1;
      } else if(req.body.grade === '임원'){
        Admin = 2;
      } else if(req.body.grade === 'OPG 회원'){
        Admin = 3;
      } else if(req.body.grade === '예비 멤버'){
        Aadmin = 4;
      }
      console.log(req);
      User.findOneAndUpdate({_id:req.params.id}, {$set:{grade:req.body.grade, admin:Admin}},{new:true}, function(err, user){
        if(err) return res.json(err);
        res.redirect("/member/edit");
      });
});


// delete
router.delete("/:id", function(req, res){
 User.remove({_id:req.params.id}, function(err){
  if(err) return res.json(err);
  res.redirect("/member/edit");
 });
});

module.exports = router;
