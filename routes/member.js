var express = require('express');
var router = express.Router();
var async = require('async');
var User = require('../models/User');
var util = require('../config/util.js');

/* GET home page. */
router.get('/',util.isadminThree, function(req, res, next) {
  var limit = 15;
    var page = req.query.page;
    var search = util.createSearch(req.query);
    if(page === undefined) {page = 1;}
    page = parseInt(page);
    async.waterfall([function(callback){
      if(search.findUser&& !search.findText.$or)return callback(null,null,0,0);
      User.count(search.findText,function(err,count){
      if(err){callback(err);}
      skip = (page-1)*limit;
      maxPageNum = Math.ceil(count/limit);
      callback(null,skip,maxPageNum,count);
    });
    },function (skip,maxPageNum,count,callback){
      if(search.findUser&&!search.findText.$or)return callback(null,[],0,0);
      User.find(search.findText).sort({name:1 ,year:1}).skip(skip).limit(limit).exec(function(err, users){
      if(err) {return callback(err);}
      callback(null,users,maxPageNum,count);
    });
  }],function(err,users,maxPageNum,count){
    if(err) return res.json({success:false, message:err});
    res.render('member',
    { users: users,
      title: 'Member',
      main_menu: '멤버',
      page:page,
			maxPageNum:maxPageNum,
      path: 'member',
      search:search});
    });
  });

// edit
router.get("/edit",util.isadminTwo, function(req, res){
  var limit = 15;
    var page = req.query.page;
    var search = util.createSearch(req.query);
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
      path: 'member/edit',
      search:search});
    });
  });
});

router.put("/:id",util.isadminTwo,function(req, res, next){
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
router.delete("/:id",util.isadminTwo, function(req, res){
 User.remove({_id:req.params.id}, function(err){
  if(err) return res.json(err);
  res.redirect("/member/edit");
 });
});

module.exports = router;
