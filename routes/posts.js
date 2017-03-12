var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var multer  = require('multer');
var path = require('path');
var mkdirp = require('mkdirp');
var cloudinary = require('cloudinary');
var Posts=require('../models/Posts');
var util = require('../config/util.js');

var lib = require('../config/posts_controller.js');

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

//Create Directory for file save
var UploadPath = path.join(__dirname,'..','public','uploadedfiles');
mkdirp.sync(UploadPath);

//multer setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..','public','uploadedfiles'));
  },
  filename: function (req, file, cb) {
      var originalname = file.originalname;
      var extension = originalname.split(".");
      // cb(null, Date.now() + '_' + file.originalname);
      cb(null,file.originalname);
  }
});
var upload = multer({storage : storage});
//

// 자유게시판 when connect 'post/'  -redirect '/postBoard'
router.get('/', function(req, res, next) {
  res.redirect('/post/Board');
});

router.get('/Board',function(req,res){
	lib.index(req,res,Posts.Post_Board,Board_Option);
});//index


router.get('/Board/new',util.isLoggedin,function(req,res){
	lib.new(req,res,Posts.Post_Board,Board_Option);
});//new


router.post('/Board',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Posts.Post_Board,Board_Option);
});//create

router.get('/Board/:id',function(req,res){
	lib.show(req,res,Posts.Post_Board,Board_Option);
});//show

router.get('/Board/:id/edit',util.isLoggedin,function(req,res){
	lib.edit(req,res,Posts.Post_Board,Board_Option);
});//edit

router.put('/Board/:id',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Posts.Post_Board,Board_Option);
});//update

router.delete('/Board/:id',util.isLoggedin,function(req,res){
	lib.destroy(req,res,Posts.Post_Board,Board_Option);
});//destroy

////comment
router.post('/Board/:id/comments',function(req,res){
	lib.comment_push(req,res,Posts.Post_Board,Board_Option);
});

router.delete('/Board/:id/comments/:commentId',function(req,res){
	lib.comment_pull(req,res,Posts.Post_Board,Board_Option);
});//destroy



//Post_Inquire
router.get('/Inquire',function(req,res){
	lib.index(req,res,Posts.Post_Inquire,Inquire_Option);
});//index
router.get('/Inquire/new',util.isLoggedin,function(req,res){
	lib.new(req,res,Posts.Post_Inquire,Inquire_Option);
});//new
router.post('/Inquire',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Posts.Post_Inquire,Inquire_Option);
});//create
router.get('/Inquire/:id',function(req,res){
	lib.show(req,res,Posts.Post_Inquire,Inquire_Option);
});//show
router.get('/Inquire/:id/edit',util.isLoggedin,function(req,res){
	lib.edit(req,res,Posts.Post_Inquire,Inquire_Option);
});//edit
router.put('/Inquire/:id',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Posts.Post_Inquire,Inquire_Option);
});//update
router.delete('/Inquire/:id',util.isLoggedin,function(req,res){
	lib.destroy(req,res,Posts.Post_Inquire,Inquire_Option);
});//destroy

////comment
router.post('/Inquire/:id/comments',function(req,res){
	lib.comment_push(req,res,Posts.Post_Inquire,Inquire_Option);
});

router.delete('/Inquire/:id/comments/:commentId',function(req,res){
	lib.comment_pull(req,res,Posts.Post_Inquire,Inquire_Option);
});//destroy



//Post_Study
router.get('/Study',function(req,res){
	lib.index(req,res,Posts.Post_Study,Study_Option);
});//index
router.get('/Study/new',util.isLoggedin,function(req,res){
	lib.new(req,res,Posts.Post_Study,Study_Option);
});//new
router.post('/Study',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Posts.Post_Study,Study_Option);
});//create
router.get('/Study/:id',function(req,res){
	lib.show(req,res,Posts.Post_Study,Study_Option);
});//show
router.get('/Study/:id/edit',util.isLoggedin,function(req,res){
	lib.edit(req,res,Posts.Post_Study,Study_Option);
});//edit
router.put('/Study/:id',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Posts.Post_Study,Study_Option);
});//update
router.delete('/Study/:id',util.isLoggedin,function(req,res){
	lib.destroy(req,res,Posts.Post_Study,Study_Option);
});//destroy

////comment
router.post('/Study/:id/comments',function(req,res){
	lib.comment_push(req,res,Posts.Post_Study,Study_Option);
});

router.delete('/Study/:id/comments/:commentId',function(req,res){
	lib.comment_pull(req,res,Posts.Post_Study,Study_Option);
});//destroy



//Post_Food
router.get('/Food',function(req,res){
	lib.index(req,res,Posts.Post_Food,Food_Option);
});//index
router.get('/Food/new',util.isLoggedin,function(req,res){
	lib.new(req,res,Posts.Post_Food,Food_Option);
});//new
router.post('/Food',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Posts.Post_Food,Food_Option);
});//create
router.get('/Food/:id',function(req,res){
	lib.show(req,res,Posts.Post_Food,Food_Option);
});//show
router.get('/Food/:id/edit',util.isLoggedin,function(req,res){
	lib.edit(req,res,Posts.Post_Food,Food_Option);
});//edit
router.put('/Food/:id',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Posts.Post_Food,Food_Option);
});//update
router.delete('/Food/:id',util.isLoggedin,function(req,res){
	lib.destroy(req,res,Posts.Post_Food,Food_Option);
});//destroy

////comment
router.post('/Food/:id/comments',function(req,res){
	lib.comment_push(req,res,Posts.Post_Food,Food_Option);
});

router.delete('/Food/:id/comments/:commentId',function(req,res){
	lib.comment_pull(req,res,Posts.Post_Food,Food_Option);
});//destroy

//<---Image Upload---
router.post('/imageupload', upload.single('image'), function(req,res, next){
    cloudinary.uploader.upload(req.file.path, function(result) {
      res.send(result);
      if(result && req.file.path !== undefined){
        fs.unlink(path.join(req.file.path));
        console.log("LocalTemporary Image Deleted");
      }
     }, {use_filename: true, unique_filename: true });
});
//---Image Upload--->

module.exports = router;
