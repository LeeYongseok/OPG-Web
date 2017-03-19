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

var notice_Option = {
    title:'공지사항',
    path:'notice'
};

var Activity_Option = {
  title: 'MT / 활동',
  path: 'photo/Activity'
};
var Photo_Study_Option = {
  title: '스터디사진',
  path:'photo/Study',
};
var Seminar_Option = {
  title: '세미나사진',
  path: 'photo/Seminar'
};
var Work_Option = {
  title: '작품게시판',
  path: 'photo/Work'
};

var Board_Option = {
	title:'자유게시판',
	path:'post/Board'
};
var Inquire_Option = {
	title:'질의응답',
	path:'post/Inquire'
};

var Study_Option = {
	title:'스터디 모집',
	path:'post/Study'
};

var Food_Option = {
	title:'맛집 정보',
	path:'post/Food'
};

var Programming_Option = {
	title:'프로그래밍 게시판',
	path:'info/ProgrammingBoard'
};
var ProgrammingServer_Option = {
	title:'서버 게시판',
	path:'info/ProgrammingServer'
};
var ProgrammingLanguage_Option = {
	title:'언어 게시판',
	path:'info/ProgrammingLanguage'
};
var ProgrammingWeb_Option = {
	title:'웹 게시판',
	path:'info/ProgrammingWeb'
};
var ProgrammingMobile_Option = {
	title:'모바일 게시판',
	path:'info/ProgrammingMobile'
};
var Exhibition_Option = {
	title:'공모전/전시회',
	path:'info/Exhibition'
};
var IT_Option = {
	title:'IT정보',
	path:'info/IT'
};
var Job_Option = {
	title:'취업 정보',
	path:'info/Job'
};

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
  			lib.latest_list(new_list,expire_date,notices.notice_Board,notice_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Posts.Post_Board,Board_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Posts.Post_Inquire,Inquire_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Posts.Post_Study,Study_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Posts.Post_Food,Food_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_ProgrammingBoard,Programming_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_ProgrammingServer,ProgrammingServer_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_ProgrammingLanguage,ProgrammingLanguage_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_ProgrammingWeb,ProgrammingWeb_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_ProgrammingMobile,ProgrammingMobile_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_Exhibition,Exhibition_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_IT,IT_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,Info.Info_Job,Job_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,iPostMod.iPostMod_Activity,Activity_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,iPostMod.iPostMod_Study,Photo_Study_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,iPostMod.iPostMod_Seminar,Seminar_Option,callback);
	  	},function(new_list,callback){
  			lib.latest_list(new_list,expire_date,iPostMod.iPostMod_Work,Work_Option,callback);
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
