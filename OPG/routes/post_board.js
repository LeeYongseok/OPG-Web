var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post=require('../models/Post');

// 자유게시판
router.get('/',function(req,res){
	Post.find({}).sort('-createdAt').exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '자유게시판',
			main_menu: '자유게시판',
			path:'post'
		});
	});
});//index
router.get('/new',function(req,res){
	res.render("post_new",{
			title: '자유게시판',
			main_menu: '자유게시판 글 쓰기',
			path:'post'
		});
});//new
router.post('/',function(req,res){
	Post.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post');
	});
});//create
router.get('/:id',function(req,res){
	Post.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '자유게시판',
			main_menu: '자유게시판',
			path:'post'
		});
	});
});//show
router.get('/:id/edit',function(req,res){
	Post.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '자유게시판',
			main_menu: '자유게시판 글 수정',
			path:'post'
		});
	});
});//edit
router.put('/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Post.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post/'+req.params.id);
	});
});//update
router.delete('/:id',function(req,res){
	Post.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/post');
	});
});//destroy

//자유게시판 끝

module.exports = router;