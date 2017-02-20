var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Food=require('../models/Food');

//맛집 게시판
router.get('/',function(req,res){
	Food.find({}).sort('-createdAt').exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '맛집 정보',
			main_menu: '맛집 정보 게시판',
			path:'food'
		});
	});
});//index
router.get('/new',function(req,res){
	res.render("post_new",{
			title: '맛집 정보',
			main_menu: '맛집 정보 글 쓰기',
			path:'food'
		});
});//new
router.post('/',function(req,res){
	Food.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/food');
	});
});//create
router.get('/:id',function(req,res){
	Food.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '맛집 정보',
			main_menu: '맛집 정보 게시판',
			path:'food'
		});
	});
});//show
router.get('/:id/edit',function(req,res){
	Food.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '맛집 정보',
			main_menu: '맛집 정보 글 수정',
			path:'food'
		});
	});
});//edit
router.put('/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Food.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/food/'+req.params.id);
	});
});//update
router.delete('/:id',function(req,res){
	Food.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/food');
	});
});//destroy
//맛집 게시판 끝

module.exports = router;