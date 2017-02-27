var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Info=require('../models/Info');
var util = require('../config/util.js');
var lib = require('../config/posts_controller.js')

var Programming_Option = {
	title:'프로그래밍 게시판',
	path:'info/ProgrammingBoard'
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
	lib.index(req,res,Info.Info_Programming,Programming_Option);
});//index
router.get('/ProgrammingBoard/new',util.isLoggedin,function(req,res){
	lib.new(req,res,Info.Info_Programming,Programming_Option);
});//new
router.post('/ProgrammingBoard',util.isLoggedin,function(req,res){
	lib.create(req,res,Info.Info_Programming,Programming_Option);
});//create
router.get('/ProgrammingBoard/:id',function(req,res){
	lib.show(req,res,Info.Info_Programming,Programming_Option);
});//show
router.get('/ProgrammingBoard/:id/edit',util.isLoggedin,function(req,res){
	lib.edit(req,res,Info.Info_Programming,Programming_Option);
});//edit
router.put('/ProgrammingBoard/:id',util.isLoggedin,function(req,res){
	lib.update(req,res,Info.Info_Programming,Programming_Option);
});//update
router.delete('/ProgrammingBoard/:id',util.isLoggedin,function(req,res){
	lib.destroy(req,res,Info.Info_Programming,Programming_Option);
});//destroy

////comment
router.post('/ProgrammingBoard/:id/comments',function(req,res){
	lib.comment_push(req,res,Info.Info_Programming,Programming_Option);
});

router.delete('/ProgrammingBoard/:id/comments/:commentId',function(req,res){
	lib.comment_pull(req,res,Info.Info_Programming,Programming_Option);
});//destroy

////Exhibition

router.get('/Exhibition',function(req,res){
	lib.index(req,res,Info.Info_Exhibition,Exhibition_Option);
});//index
router.get('/Exhibition/new',function(req,res){
	lib.new(req,res,Info.Info_Exhibition,Exhibition_Option);
});//new
router.post('/Exhibition',util.isLoggedin,function(req,res){
	lib.create(req,res,Info.Info_Exhibition,Exhibition_Option);
});//create
router.get('/Exhibition/:id',util.isLoggedin,function(req,res){
	lib.show(req,res,Info.Info_Exhibition,Exhibition_Option);
});//show
router.get('/Exhibition/:id/edit',util.isLoggedin,function(req,res){
	lib.edit(req,res,Info.Info_Exhibition,Exhibition_Option);
});//edit
router.put('/Exhibition/:id',util.isLoggedin,function(req,res){
	lib.update(req,res,Info.Info_Exhibition,Exhibition_Option);
});//update
router.delete('/Exhibition/:id',util.isLoggedin,function(req,res){
	lib.destroy(req,res,Info.Info_Exhibition,Exhibition_Option);
});//destroy

////comment
router.post('/Exhibition/:id/comments',function(req,res){
	lib.comment_push(req,res,Info.Info_Exhibition,Exhibition_Option);
});

router.delete('/Exhibition/:id/comments/:commentId',function(req,res){
	lib.comment_pull(req,res,Info.Info_Exhibition,Exhibition_Option);
});//destroy


////IT_info

router.get('/IT',function(req,res){
	lib.index(req,res,Info.Info_IT,IT_Option);
});//index
router.get('/IT/new',function(req,res){
	lib.new(req,res,Info.Info_IT,IT_Option);
});//new
router.post('/IT',function(req,res){
	lib.create(req,res,Info.Info_IT,IT_Option);
});//create
router.get('/IT/:id',function(req,res){
	lib.show(req,res,Info.Info_IT,IT_Option);
});//show
router.get('/IT/:id/edit',function(req,res){
	lib.edit(req,res,Info.Info_IT,IT_Option);
});//edit
router.put('/IT/:id',util.isLoggedin,function(req,res){
	lib.update(req,res,Info.Info_IT,IT_Option);
});//update
router.delete('/IT/:id',util.isLoggedin,function(req,res){
	lib.destroy(req,res,Info.Info_IT,IT_Option);
});//destroy

////comment
router.post('/IT/:id/comments',function(req,res){
	lib.comment_push(req,res,Info.Info_IT,IT_Option);
});

router.delete('/IT/:id/comments/:commentId',function(req,res){
	lib.comment_pull(req,res,Info.Info_IT,IT_Option);
});//destroy

////Job_info

router.get('/Job',function(req,res){
	lib.index(req,res,Info.Info_Job,Job_Option);
});//index
router.get('/Job/new',util.isLoggedin,function(req,res){
	lib.new(req,res,Info.Info_Job,Job_Option);
});//new
router.post('/Job',util.isLoggedin,function(req,res){
	lib.create(req,res,Info.Info_Job,Job_Option);
});//create
router.get('/Job/:id',function(req,res){
	lib.show(req,res,Info.Info_Job,Job_Option);
});//show
router.get('/Job/:id/edit',function(req,res){
	lib.edit(req,res,Info.Info_Job,Job_Option);
});//edit
router.put('/Job/:id',util.isLoggedin,function(req,res){
	lib.update(req,res,Info.Info_Job,Job_Option);
});//update
router.delete('/Job/:id',util.isLoggedin,function(req,res){
	lib.destroy(req,res,Info.Info_Job,Job_Option);
});//destroy

////comment
router.post('/Job/:id/comments',function(req,res){
	lib.comment_push(req,res,Info.Info_Job,Job_Option);
});

router.delete('/Job/:id/comments/:commentId',function(req,res){
	lib.comment_pull(req,res,Info.Info_Job,Job_Option);
});//destroy

module.exports = router;