var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Study=require('../models/Study');

//스터디 모집 게시판
router.get('/',function(req,res){
	Study.find({}).sort('-createdAt').exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '스터디 모집',
			main_menu: '스터디 모집 게시판',
			path:'study'
		});
	});
});//index
router.get('/new',function(req,res){
	res.render("post_new",{
			title: '스터디 모집',
			main_menu: '스터디 모집 글 쓰기',
			path:'study'
		});
});//new
router.post('/',function(req,res){
	Study.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/study');
	});
});//create
router.get('/:id',function(req,res){
	Study.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '스터디 모집',
			main_menu: '스터디 모집 게시판',
			path:'study'
		});
	});
});//show
router.get('/:id/edit',function(req,res){
	Study.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '스터디 모집',
			main_menu: '스터디 모집 글 수정',
			path:'study'
		});
	});
});//edit
router.put('/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Study.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/study/'+req.params.id);
	});
});//update
router.delete('/:id',function(req,res){
	Study.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/study');
	});
});//destroy
//스터디 모집 게시판 끝

module.exports = router;