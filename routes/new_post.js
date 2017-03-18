var express= require('express');
var router = express.Router();
var async = require('async');
var mongoose = require('mongoose');
var notices=require('../models/notices');
var Posts=require('../models/Posts');
var iPostMod = require('../models/photos');
var Info=require('../models/Info');

var util = require('../config/util.js');
var lib = require('../config/posts_controller.js')

var expire_date = new Date();
expire_date.setDate(expire_date.getDate()-7); // 기한은 7일로 지정함

//공지사항
router.get('/',util.isLoggedin,function(req,res){
  	var page = req.query.page;
  	var list=[];
  	if(page === undefined) {page = 1;}
  	page = parseInt(page);
  	async.waterfall([function(callback){
  			var new_list=[];
  			lib.latest_list(new_list,expire_date,notices.notice_Board,'notice',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Posts.Post_Board,'post/Board',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Posts.Post_Inquire,'post/Inquire',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Posts.Post_Study,'post/Study',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Posts.Post_Food,'post/Food',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_ProgrammingBoard,'info/ProgrammingBoard',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_ProgrammingServer,'info/ProgrammingServer',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_ProgrammingLanguage,'info/ProgrammingLanguage',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_ProgrammingWeb,'info/ProgrammingWeb',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_ProgrammingMobile,'info/ProgrammingMobile',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_Exhibition,'info/Exhibition',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_IT,'info/IT',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_Job,'info/Job',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,iPostMod.iPostMod_Activity,'photo/Activity',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,iPostMod.iPostMod_Study,'photo/Study',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,iPostMod.iPostMod_Seminar,'photo/Seminar',callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,iPostMod.iPostMod_Work,'photo/Work',callback);
	  	}],function(err,new_list){
	  		if(err) return res.json({success:false, message:err});
	  		new_list.sort(function (a, b) { //작성일 순으로 정렬 알고리즘
				return a.post.createdAt.getTime() < b.post.createdAt.getTime() ? 1 : a.post.createdAt.getTime() > b.post.createdAt.getTime() ? -1 : 0;  
			});
	  		res.render("../views/PostBoard/new_post_index",{
					data:new_list,
					title: '새로운 글',
					main_menu: '새로운 글',
					path:'/new_post',
					count:new_list.length,
					urlQuery:req._parsedUrl.query,
					user:req.user
			});
	 });
});//index



module.exports = router;
