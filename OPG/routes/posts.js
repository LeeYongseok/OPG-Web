var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Posts=require('../models/Posts');

// 자유게시판
router.get('/', function(req, res, next) {
  res.redirect('/post/Board');

});
//Post_board
router.get('/Board',function(req,res){
	 var limit = 10;
  	var page = req.query.page;
  	if(page === undefined) {page = 1;}
  	page = parseInt(page);

  	Posts.Post_Board.count({},function(err,count){
  		if(err) return res.json({success:false, message:err});
    	var skip = (page-1)*limit;
    	var maxPageNum = Math.ceil(count/limit);
		Posts.Post_Board.find({}).sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '자유게시판',
			main_menu: '자유게시판',
			path:'post/Board',
			page:page,
			maxPageNum:maxPageNum
		});
	});
	});
});//index
router.get('/Board/new',function(req,res){
	res.render("post_new",{
			title: '자유게시판',
			main_menu: '자유게시판 글 쓰기',
			path:'post/Board',
			page:req.query.page
		});
});//new
router.post('/Board',function(req,res){
	Posts.Post_Board.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Board');
	});
});//create
router.get('/Board/:id',function(req,res){
	Posts.Post_Board.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '자유게시판',
			main_menu: '자유게시판',
			page: req.query.page,
			path:'post/Board'
		});
	});
});//show
router.get('/Board/:id/edit',function(req,res){
	Posts.Post_Board.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '자유게시판',
			main_menu: '자유게시판 글 수정',
			page: req.query.page,
			path:'post/Board'
		});
	});
});//edit
router.put('/Board/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Posts.Post_Board.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/Board/:id',function(req,res){
	Posts.Post_Board.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Board');
	});
});//destroy


//Post_Inquire
router.get('/Inquire',function(req,res){
	 var limit = 10;
  	var page = req.query.page;
  	if(page === undefined) {page = 1;}
  	page = parseInt(page);

  	Posts.Post_Inquire.count({},function(err,count){
  		if(err) return res.json({success:false, message:err});
    	var skip = (page-1)*limit;
    	var maxPageNum = Math.ceil(count/limit);
		Posts.Post_Inquire.find({}).sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '질의응답',
			main_menu: '질의응답 게시판',
			path:'post/Inquire',
			page:page,
			maxPageNum:maxPageNum
		});
	});
	});
});//index
router.get('/Inquire/new',function(req,res){
	res.render("post_new",{
			title: '질의응답',
			main_menu: '질의응답 글 쓰기',
			path:'post/Inquire',
			page:req.query.page
		});
});//new
router.post('/Inquire',function(req,res){
	Posts.Post_Inquire.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Inquire');
	});
});//create
router.get('/Inquire/:id',function(req,res){
	Posts.Post_Inquire.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '질의응답',
			main_menu: '질의응답',
			page: req.query.page,
			path:'post/Inquire'
		});
	});
});//show
router.get('/Inquire/:id/edit',function(req,res){
	Posts.Post_Inquire.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '질의응답',
			main_menu: '질의응답 글 수정',
			page: req.query.page,
			path:'post/Inquire'
		});
	});
});//edit
router.put('/Inquire/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Posts.Post_Inquire.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/Inquire/:id',function(req,res){
	Posts.Post_Inquire.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Inquire');
	});
});//destroy

//Post_Study
router.get('/Study',function(req,res){
	 var limit = 10;
  	var page = req.query.page;
  	if(page === undefined) {page = 1;}
  	page = parseInt(page);

  	Posts.Post_Study.count({},function(err,count){
  		if(err) return res.json({success:false, message:err});
    	var skip = (page-1)*limit;
    	var maxPageNum = Math.ceil(count/limit);
		Posts.Post_Study.find({}).sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '스터디 모집',
			main_menu: '스터디 모집 게시판',
			path:'post/Study',
			page:page,
			maxPageNum:maxPageNum
		});
	});
	});
});//index
router.get('/Study/new',function(req,res){
	res.render("post_new",{
			title: '스터디 모집',
			main_menu: '스터디 모집 글 쓰기',
			path:'post/Study',
			page:req.query.page
		});
});//new
router.post('/Study',function(req,res){
	Posts.Post_Study.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Study');
	});
});//create
router.get('/Study/:id',function(req,res){
	Posts.Post_Study.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '스터디 모집',
			main_menu: '스터디 모집',
			page: req.query.page,
			path:'post/Study'
		});
	});
});//show
router.get('/Study/:id/edit',function(req,res){
	Posts.Post_Study.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '스터디 모집',
			main_menu: '스터디 모집 글 수정',
			page: req.query.page,
			path:'post/Study'
		});
	});
});//edit
router.put('/Study/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Posts.Post_Study.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/Study/:id',function(req,res){
	Posts.Post_Study.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Study');
	});
});//destroy

//Post_Food
router.get('/Food',function(req,res){
	 var limit = 10;
  	var page = req.query.page;
  	if(page === undefined) {page = 1;}
  	page = parseInt(page);

  	Posts.Post_Food.count({},function(err,count){
  		if(err) return res.json({success:false, message:err});
    	var skip = (page-1)*limit;
    	var maxPageNum = Math.ceil(count/limit);
		Posts.Post_Food.find({}).sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '맛집 정보',
			main_menu: '맛집 정보 게시판',
			path:'post/Food',
			page:page,
			maxPageNum:maxPageNum
		});
	});
	});
});//index
router.get('/Food/new',function(req,res){
	res.render("post_new",{
			title: '맛집 정보',
			main_menu: '맛집 정보 글 쓰기',
			path:'post/Food',
			page:req.query.page
		});
});//new
router.post('/Food',function(req,res){
	Posts.Post_Food.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Food');
	});
});//create
router.get('/Food/:id',function(req,res){
	Posts.Post_Food.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '맛집 정보',
			main_menu: '맛집 정보',
			page: req.query.page,
			path:'post/Food'
		});
	});
});//show
router.get('/Food/:id/edit',function(req,res){
	Posts.Post_Food.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '맛집 정보',
			main_menu: '맛집 정보 글 수정',
			page: req.query.page,
			path:'post/Food'
		});
	});
});//edit
router.put('/Food/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Posts.Post_Food.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/Food/:id',function(req,res){
	Posts.Post_Food.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Food');
	});
});//destroy


module.exports = router;
