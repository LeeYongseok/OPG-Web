var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var notices=require('../models/notices');
var util = require('../config/util.js');
var lib = require('../config/posts_controller.js');

var notice_Option = {
    title:'공지사항',
    path:'notice'
};

//공지사항
router.get('/',function(req,res){
	lib.index(req,res,notices.notice_Board,notice_Option);
});//index
router.get('/new',util.isLoggedin,function(req,res){
	lib.new(req,res,notices.notice_Board,notice_Option);
});//new
router.post('/',util.isLoggedin,function(req,res){
	lib.create(req,res,notices.notice_Board,notice_Option);
});//create
router.get('/:id',function(req,res){
	lib.show(req,res,notices.notice_Board,notice_Option);
});//show
router.get('/:id/edit',util.isLoggedin,function(req,res){
	lib.edit(req,res,notices.notice_Board,notice_Option);
});//edit
router.put('/:id',util.isLoggedin,function(req,res){
	lib.update(req,res,notices.notice_Board,notice_Option);
});//update
router.delete('/:id',util.isLoggedin,function(req,res){
	lib.destroy(req,res,notices.notice_Board,notice_Option);
});//destroy

////comment
router.post('/:id/comments',function(req,res){
	lib.comment_push(req,res,notices.notice_Board,notice_Option);
});

router.delete('/:id/comments/:commentId',function(req,res){
	lib.comment_pull(req,res,notices.notice_Board,notice_Option);
});//destroy

module.exports = router;
