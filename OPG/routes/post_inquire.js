var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Inquire=require('../models/Inquire');

// 질의응답게시판
router.get('/',function(req,res){
	Inquire.find({}).sort('-createdAt').exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '질의응답',
			main_menu: '질의응답게시판',
			path:'inquire'
		});
	});
});//index
router.get('/new',function(req,res){
	res.render("post_new",{
			title: '질의응답',
			main_menu: '질의응답게시판 글 쓰기',
			path:'inquire'
		});
});//new
router.post('/',function(req,res){
	Inquire.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/inquire');
	});
});//create
router.get('/:id',function(req,res){
	Inquire.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '질의응답',
			main_menu: '질의응답게시판',
			path:'inquire'
		});
	});
});//show
router.get('/:id/edit',function(req,res){
	Inquire.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '질의응답',
			main_menu: '질의응답게시판 글 수정',
			path:'inquire'
		});
	});
});//edit
router.put('/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Inquire.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/inquire/'+req.params.id);
	});
});//update
router.delete('/:id',function(req,res){
	Inquire.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/inquire');
	});
});//destroy

//질의응답 게시판 끝

module.exports = router;