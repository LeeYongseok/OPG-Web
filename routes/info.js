var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Info=require('../models/Info');
var util = require('../config/util.js');

router.get('/', function(req, res, next) {
  res.redirect('/info/Programming');
});

//Programming
router.get('/Programming', function(req, res, next) {
  res.render('programming',{
  	title:'프로그래밍',
  	main_menu:'PROGRAMMING'
  });
});

router.get('/ProgrammingBoard',function(req,res){
	var limit = 10;
  	var page = req.query.page;
  	if(page === undefined) {page = 1;}
  	page = parseInt(page);

  	Info.Info_Programming.count({},function(err,count){
  		if(err) return res.json({success:false, message:err});
    	var skip = (page-1)*limit;
    	var maxPageNum = Math.ceil(count/limit);
		Info.Info_Programming.find({}).populate('author').sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '프로그래밍',
			main_menu: '프로그래밍 게시판',
			path:'info/ProgrammingBoard',
			page:page,
			maxPageNum:maxPageNum,
			user:req.user
		});
	});
	});
});//index
router.get('/ProgrammingBoard/new',util.isLoggedin,function(req,res){
	res.render("post_new",{
			title: '프로그래밍',
			main_menu: '프로그래밍 게시판 글 쓰기',
			path:'info/ProgrammingBoard',
			page:req.query.page
		});
});//new
router.post('/ProgrammingBoard',util.isLoggedin,function(req,res){
	req.body.post.author = req.user._id;
	Info.Info_Programming.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/ProgrammingBoard');
	});
});//create
router.get('/ProgrammingBoard/:id',function(req,res){
	Info.Info_Programming.findById(req.params.id).populate(['author','comments.author']).exec(function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '프로그래밍',
			main_menu: '프로그래밍 게시판',
			page: req.query.page,
			path:'/info/ProgrammingBoard',
			user:req.user
		});
	});
});//show
router.get('/ProgrammingBoard/:id/edit',util.isLoggedin,function(req,res){
	Info.Info_Programming.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!req.user._id.equals(post.author))return res.json({success:false, message:"Unauthrized Attempt"});
		res.render('post_edit',{
			data:post,
			title: '프로그래밍',
			main_menu: '프로그래밍 게시판 글 수정',
			page: req.query.page,
			path:'/info/ProgrammingBoard',
			user:req.user
		});
	});
});//edit
router.put('/ProgrammingBoard/:id',util.isLoggedin,function(req,res){
	req.body.post.updatedAt=Date.now();
	Info.Info_Programming.findOneAndUpdate({_id:req.params.id, author:req.user._id},req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to update"});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/ProgrammingBoard/:id',util.isLoggedin,function(req,res){
	Info.Info_Programming.findOneAndRemove({_id:req.params.id, author:req.user._id},function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to remove"});
		res.redirect('/info/ProgrammingBoard');
	});
});//destroy

////comment
router.post('/ProgrammingBoard/:id/comments',function(req,res){
	var newComment = req.body.comment;
	newComment.author = req.user._id;
	Info.Info_Programming.update({_id:req.params.id},{$push:{comments:newComment}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/ProgrammingBoard/'+req.params.id);
	});
});

router.delete('/ProgrammingBoard/:id/comments/:commentId',function(req,res){
		Info.Info_Programming.update({_id:req.params.id},{$pull:{comments:{_id:req.params.commentId}}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/ProgrammingBoard/'+req.params.id);
	});
});//destroy

////Exhibition

router.get('/Exhibition',function(req,res){
	var limit = 10;
  	var page = req.query.page;
  	if(page === undefined) {page = 1;}
  	page = parseInt(page);

  	Info.Info_Exhibition.count({},function(err,count){
  		if(err) return res.json({success:false, message:err});
    	var skip = (page-1)*limit;
    	var maxPageNum = Math.ceil(count/limit);
		Info.Info_Exhibition.find({}).populate('author').sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '공모전/전시회',
			main_menu: '공모전/전시회 게시판',
			path:'info/Exhibition',
			page:page,
			maxPageNum:maxPageNum,
			user:req.user
		});
	});
	});
});//index
router.get('/Exhibition/new',function(req,res){
	res.render("post_new",{
			title: '공모전/전시회',
			main_menu: '공모전/전시회 게시판 글 쓰기',
			path:'info/Exhibition',
			page:req.query.page
		});
});//new
router.post('/Exhibition',util.isLoggedin,function(req,res){
	req.body.post.author = req.user._id;
	Info.Info_Exhibition.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/Exhibition');
	});
});//create
router.get('/Exhibition/:id',util.isLoggedin,function(req,res){
	Info.Info_Exhibition.findById(req.params.id).populate(['author','comments.author']).exec(function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '공모전/전시회',
			main_menu: '공모전/전시회 게시판',
			page: req.query.page,
			path:'/info/Exhibition',
			user:req.user	
		});
	});
});//show
router.get('/Exhibition/:id/edit',util.isLoggedin,function(req,res){
	Info.Info_Exhibition.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!req.user._id.equals(post.author))return res.json({success:false, message:"Unauthrized Attempt"});
		res.render('post_edit',{
			data:post,
			title: '공모전/전시회',
			main_menu: '공모전/전시회 게시판 글 수정',
			page: req.query.page,
			path:'/info/Exhibition',
			user:req.user
		});
	});
});//edit
router.put('/Exhibition/:id',util.isLoggedin,function(req,res){
	req.body.post.updatedAt=Date.now();
	Info.Info_Exhibition.findOneAndUpdate({_id:req.params.id, author:req.user._id},req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to update"});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/Exhibition/:id',util.isLoggedin,function(req,res){
	Info.Info_Exhibition.findOneAndRemove({_id:req.params.id, author:req.user._id},function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to remove"});
		res.redirect('/info/Exhibition');
	});
});//destroy

////comment
router.post('/Exhibition/:id/comments',function(req,res){
	var newComment = req.body.comment;
	newComment.author = req.user._id;
	Info.Info_Exhibition.update({_id:req.params.id},{$push:{comments:newComment}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/Exhibition/'+req.params.id);
	});
});

router.delete('/Exhibition/:id/comments/:commentId',function(req,res){
		Info.Info_Exhibition.update({_id:req.params.id},{$pull:{comments:{_id:req.params.commentId}}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/Exhibition/'+req.params.id);
	});
});//destroy


////IT_info

router.get('/IT',function(req,res){
	var limit = 10;
  	var page = req.query.page;
  	if(page === undefined) {page = 1;}
  	page = parseInt(page);

  	Info.Info_IT.count({},function(err,count){
  		if(err) return res.json({success:false, message:err});
    	var skip = (page-1)*limit;
    	var maxPageNum = Math.ceil(count/limit);
		Info.Info_IT.find({}).sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: 'IT정보',
			main_menu: 'IT정보 게시판',
			path:'info/IT',
			page:page,
			maxPageNum:maxPageNum,
			user:req.user
		});
	});
	});
});//index
router.get('/IT/new',function(req,res){
	res.render("post_new",{
			title: 'IT정보',
			main_menu: 'IT정보 게시판 글 쓰기',
			path:'info/IT',
			page:req.query.page
		});
});//new
router.post('/IT',function(req,res){
	req.body.post.author = req.user._id;
	Info.Info_IT.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/IT');
	});
});//create
router.get('/IT/:id',function(req,res){
	Info.Info_IT.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: 'IT정보',
			main_menu: 'IT정보 게시판',
			page: req.query.page,
			path:'/info/IT',
			user:req.user
		});
	});
});//show
router.get('/IT/:id/edit',function(req,res){
	Info.Info_IT.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: 'IT정보',
			main_menu: 'IT정보 게시판 글 수정',
			page: req.query.page,
			path:'/info/Exhibition',
			user:req.user
		});
	});
});//edit
router.put('/IT/:id',util.isLoggedin,function(req,res){
	req.body.post.updatedAt=Date.now();
	Info.Info_IT.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/IT/:id',util.isLoggedin,function(req,res){
	Info.Info_IT.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/IT');
	});
});//destroy

////comment
router.post('/IT/:id/comments',function(req,res){
	var newComment = req.body.comment;
	newComment.author = req.user._id;
	Info.Info_IT.update({_id:req.params.id},{$push:{comments:newComment}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/IT/'+req.params.id);
	});
});

router.delete('/IT/:id/comments/:commentId',function(req,res){
		Info.Info_IT.update({_id:req.params.id},{$pull:{comments:{_id:req.params.commentId}}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/IT/'+req.params.id);
	});
});//destroy

////Job_info

router.get('/Job',function(req,res){
	var limit = 10;
  	var page = req.query.page;
  	if(page === undefined) {page = 1;}
  	page = parseInt(page);

  	Info.Info_Job.count({},function(err,count){
  		if(err) return res.json({success:false, message:err});
    	var skip = (page-1)*limit;
    	var maxPageNum = Math.ceil(count/limit);
		Info.Info_Job.find({}).populate('author').sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '취업정보',
			main_menu: '취업정보 게시판',
			path:'info/Job',
			page:page,
			maxPageNum:maxPageNum,
			user:req.user
		});
	});
	});
});//index
router.get('/Job/new',util.isLoggedin,function(req,res){
	res.render("post_new",{
			title: '취업정보',
			main_menu: '취업정보 게시판 글 쓰기',
			path:'info/Job',
			page:req.query.page
		});
});//new
router.post('/Job',util.isLoggedin,function(req,res){
	req.body.post.author = req.user._id;
	Info.Info_Job.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/Job');
	});
});//create
router.get('/Job/:id',function(req,res){
	Info.Info_Job.findById(req.params.id).populate(['author','comments.author']).exec(function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '취업정보',
			main_menu: '취업정보 게시판',
			page: req.query.page,
			path:'/info/Job',
			user:req.user
		});
	});
});//show
router.get('/Job/:id/edit',function(req,res){
	Info.Info_Job.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!req.user._id.equals(post.author))return res.json({success:false, message:"Unauthrized Attempt"});
		res.render('post_edit',{
			data:post,
			title: '취업정보',
			main_menu: '취업정보 게시판 글 수정',
			page: req.query.page,
			path:'/info/Job',
			user:req.user
		});
	});
});//edit
router.put('/Job/:id',util.isLoggedin,function(req,res){
	req.body.post.updatedAt=Date.now();
	Info.Info_Job.findOneAndUpdate({_id:req.params.id, author:req.user._id},req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to update"});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/Job/:id',util.isLoggedin,function(req,res){
	Info.Info_Job.findOneAndRemove({_id:req.params.id, author:req.user._id},function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to remove"});
		res.redirect('/info/Job');
	});
});//destroy

////comment
router.post('/Job/:id/comments',function(req,res){
	var newComment = req.body.comment;
	newComment.author = req.user._id;
	Info.Info_Job.update({_id:req.params.id},{$push:{comments:newComment}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/Job/'+req.params.id);
	});
});

router.delete('/Job/:id/comments/:commentId',function(req,res){
		Info.Info_Job.update({_id:req.params.id},{$pull:{comments:{_id:req.params.commentId}}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/info/Job/'+req.params.id);
	});
});//destroy

module.exports = router;