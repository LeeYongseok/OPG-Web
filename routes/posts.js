var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Posts=require('../models/Posts');
var util = require('../config/util.js');

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
		Posts.Post_Board.find({}).populate('author').sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '자유게시판',
			main_menu: '자유게시판',
			path:'post/Board',
			page:page,
			maxPageNum:maxPageNum,
			user:req.user
		});
	});
	});
});//index
router.get('/Board/new',util.isLoggedin,function(req,res){
	res.render("post_new",{
			title: '자유게시판',
			main_menu: '자유게시판 글 쓰기',
			path:'post/Board',
			page:req.query.page
		});
});//new
router.post('/Board',util.isLoggedin,function(req,res){
	req.body.post.author = req.user._id;
	Posts.Post_Board.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Board');
	});
});//create
router.get('/Board/:id',function(req,res){
	Posts.Post_Board.findById(req.params.id).populate(['author','comments.author']).exec(function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '자유게시판',
			main_menu: '자유게시판',
			page: req.query.page,
			path:'post/Board',
			user:req.user
		});
	});
});//show
router.get('/Board/:id/edit',util.isLoggedin,function(req,res){
	Posts.Post_Board.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!req.user._id.equals(post.author))return res.json({success:false, message:"Unauthrized Attempt"});
		res.render('post_edit',{
			data:post,
			title: '자유게시판',
			main_menu: '자유게시판 글 수정',
			page: req.query.page,
			path:'post/Board',
			user:req.user
		});
	});
});//edit
router.put('/Board/:id',util.isLoggedin,function(req,res){
	req.body.post.updatedAt=Date.now();
	Posts.Post_Board.findOneAndUpdate({_id:req.params.id, author:req.user._id},req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to update"});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/Board/:id',util.isLoggedin,function(req,res){
	Posts.Post_Board.findOneAndRemove({_id:req.params.id, author:req.user._id},function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to remove"});
		res.redirect('/post/Board');
	});
});//destroy

////comment
router.post('/Board/:id/comments',function(req,res){
	var newComment = req.body.comment;
	newComment.author = req.user._id;
	Posts.Post_Board.update({_id:req.params.id},{$push:{comments:newComment}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Board/'+req.params.id);
	});
});

router.delete('/Board/:id/comments/:commentId',function(req,res){
		Posts.Post_Board.update({_id:req.params.id},{$pull:{comments:{_id:req.params.commentId}}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Board/'+req.params.id);
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
		Posts.Post_Inquire.find({}).populate('author').sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '질의응답',
			main_menu: '질의응답 게시판',
			path:'post/Inquire',
			page:page,
			maxPageNum:maxPageNum,
			user:req.user
		});
	});
	});
});//index
router.get('/Inquire/new',util.isLoggedin,function(req,res){
	res.render("post_new",{
			title: '질의응답',
			main_menu: '질의응답 글 쓰기',
			path:'post/Inquire',
			page:req.query.page
		});
});//new
router.post('/Inquire',util.isLoggedin,function(req,res){
	req.body.post.author = req.user._id;
	Posts.Post_Inquire.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Inquire');
	});
});//create
router.get('/Inquire/:id',function(req,res){
	Posts.Post_Inquire.findById(req.params.id).populate(['author','comments.author']).exec(function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '질의응답',
			main_menu: '질의응답',
			page: req.query.page,
			path:'post/Inquire',
			user:req.user
		});
	});
});//show
router.get('/Inquire/:id/edit',util.isLoggedin,function(req,res){
	Posts.Post_Inquire.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!req.user._id.equals(post.author))return res.json({success:false, message:"Unauthrized Attempt"});
		res.render('post_edit',{
			data:post,
			title: '질의응답',
			main_menu: '질의응답 글 수정',
			page: req.query.page,
			path:'post/Inquire',
			user:req.user
		});
	});
});//edit
router.put('/Inquire/:id',util.isLoggedin,function(req,res){
	req.body.post.updatedAt=Date.now();
	Posts.Post_Inquire.findOneAndUpdate({_id:req.params.id, author:req.user._id},req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to update"});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/Inquire/:id',util.isLoggedin,function(req,res){
	Posts.Post_Inquire.findOneAndRemove({_id:req.params.id, author:req.user._id},function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to remove"});
		res.redirect('/post/Inquire');
	});
});//destroy

////comment
router.post('/Inquire/:id/comments',function(req,res){
	var newComment = req.body.comment;
	newComment.author = req.user._id;
	Posts.Post_Inquire.update({_id:req.params.id},{$push:{comments:newComment}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Inquire/'+req.params.id);
	});
});

router.delete('/Inquire/:id/comments/:commentId',function(req,res){
		Posts.Post_Inquire.update({_id:req.params.id},{$pull:{comments:{_id:req.params.commentId}}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Inquire/'+req.params.id);
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
		Posts.Post_Study.find({}).sort('-createdAt').populate('author').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '스터디 모집',
			main_menu: '스터디 모집 게시판',
			path:'post/Study',
			page:page,
			maxPageNum:maxPageNum,
			user:req.user
		});
	});
	});
});//index
router.get('/Study/new',util.isLoggedin,function(req,res){
	res.render("post_new",{
			title: '스터디 모집',
			main_menu: '스터디 모집 글 쓰기',
			path:'post/Study',
			page:req.query.page
		});
});//new
router.post('/Study',util.isLoggedin,function(req,res){
	req.body.post.author = req.user._id;
	Posts.Post_Study.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Study');
	});
});//create
router.get('/Study/:id',function(req,res){
	Posts.Post_Study.findById(req.params.id).populate(['author','comments.author']).exec(function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '스터디 모집',
			main_menu: '스터디 모집',
			page: req.query.page,
			path:'post/Study',
			user:req.user
		});
	});
});//show
router.get('/Study/:id/edit',util.isLoggedin,function(req,res){
	Posts.Post_Study.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!req.user._id.equals(post.author))return res.json({success:false, message:"Unauthrized Attempt"});
		res.render('post_edit',{
			data:post,
			title: '스터디 모집',
			main_menu: '스터디 모집 글 수정',
			page: req.query.page,
			path:'post/Study',
			user:req.user
		});
	});
});//edit
router.put('/Study/:id',util.isLoggedin,function(req,res){
	req.body.post.updatedAt=Date.now();
	Posts.Post_Study.findOneAndUpdate({_id:req.params.id, author:req.user._id},req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to update"});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/Study/:id',util.isLoggedin,function(req,res){
	Posts.Post_Study.findOneAndRemove({_id:req.params.id, author:req.user._id},function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to remove"});
		res.redirect('/post/Study');
	});
});//destroy

////comment
router.post('/Study/:id/comments',function(req,res){
	var newComment = req.body.comment;
	newComment.author = req.user._id;
	Posts.Post_Study.update({_id:req.params.id},{$push:{comments:newComment}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Study/'+req.params.id);
	});
});

router.delete('/Study/:id/comments/:commentId',function(req,res){
		Posts.Post_Study.update({_id:req.params.id},{$pull:{comments:{_id:req.params.commentId}}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Study/'+req.params.id);
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
		Posts.Post_Food.find({}).populate('author').sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '맛집 정보',
			main_menu: '맛집 정보 게시판',
			path:'post/Food',
			page:page,
			maxPageNum:maxPageNum,
			user:req.user
		});
	});
	});
});//index
router.get('/Food/new',util.isLoggedin,function(req,res){
	res.render("post_new",{
			title: '맛집 정보',
			main_menu: '맛집 정보 글 쓰기',
			path:'post/Food',
			page:req.query.page
		});
});//new
router.post('/Food',util.isLoggedin,function(req,res){
	req.body.post.author = req.user._id;
	Posts.Post_Food.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Food');
	});
});//create
router.get('/Food/:id',function(req,res){
	Posts.Post_Food.findById(req.params.id).populate(['author','comments.author']).exec(function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '맛집 정보',
			main_menu: '맛집 정보',
			page: req.query.page,
			path:'post/Food',
			user:req.user
		});
	});
});//show
router.get('/Food/:id/edit',util.isLoggedin,function(req,res){
	Posts.Post_Food.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!req.user._id.equals(post.author))return res.json({success:false, message:"Unauthrized Attempt"});
		res.render('post_edit',{
			data:post,
			title: '맛집 정보',
			main_menu: '맛집 정보 글 수정',
			page: req.query.page,
			path:'post/Food',
			user:req.user
		});
	});
});//edit
router.put('/Food/:id',util.isLoggedin,function(req,res){
	req.body.post.updatedAt=Date.now();
	Posts.Post_Food.findOneAndUpdate({_id:req.params.id, author:req.user._id},req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to update"});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
});//update
router.delete('/Food/:id',util.isLoggedin,function(req,res){
	Posts.Post_Food.findOneAndRemove({_id:req.params.id, author:req.user._id},function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to remove"});
		res.redirect('/post/Food');
	});
});//destroy

////comment
router.post('/Food/:id/comments',function(req,res){
	var newComment = req.body.comment;
	newComment.author = req.user._id;
	Posts.Post_Food.update({_id:req.params.id},{$push:{comments:newComment}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Food/'+req.params.id);
	});
});

router.delete('/Food/:id/comments/:commentId',function(req,res){
		Posts.Post_Food.update({_id:req.params.id},{$pull:{comments:{_id:req.params.commentId}}},function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/Food/'+req.params.id);
	});
});//destroy

module.exports = router;

