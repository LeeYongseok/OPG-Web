var express= require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var multer  = require('multer');
var path = require('path');
var mkdirp = require('mkdirp');
var cloudinary = require('cloudinary');
var Info=require('../models/Info');
var util = require('../config/util.js');
var lib = require('../config/posts_controller.js')

var Programming_Option = {
	title:'프로그래밍 게시판',
	path:'info/ProgrammingBoard'
};
var ProgrammingServer_Option = {
	title:'서버 게시판',
	path:'info/ProgrammingServer'
};
var ProgrammingLanguage_Option = {
	title:'언어 게시판',
	path:'info/ProgrammingLanguage'
};
var ProgrammingWeb_Option = {
	title:'웹 게시판',
	path:'info/ProgrammingWeb'
};
var ProgrammingMobile_Option = {
	title:'모바일 게시판',
	path:'info/ProgrammingMobile'
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
var Hint_Option = {
	title:'족보 게시판',
	path:'info/Hint'
}

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
      // cb(null, Date.now() + '.' + extension[extension.length-1]);
      cb(null, Date.now() + '_' + file.originalname);
      // cb(null,file.originalname);
  }
});
var upload = multer({storage : storage});
//


router.get('/', function(req, res, next) {
  res.redirect('/info/Programming');
});

//Programming
router.get('/Programming', function(req, res, next) {
	if(!req.user){
		req.session.redirectTo= '/info/Programming';
	}
  res.render('programming',{
  	title:'프로그래밍',
  	main_menu:'PROGRAMMING'
  });
});



router.get('/ProgrammingBoard',function(req,res){
	lib.index(req,res,Info.Info_Programming,Programming_Option);
});//index
router.get('/ProgrammingBoard/new',util.isadminThree,function(req,res){
	lib.new(req,res,Info.Info_Programming,Programming_Option);
});//new
router.post('/ProgrammingBoard',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Info.Info_Programming,Programming_Option);
});//create
router.get('/ProgrammingBoard/:id',util.isLoggedin,function(req,res){
	lib.show(req,res,Info.Info_Programming,Programming_Option);
});//show
router.get('/ProgrammingBoard/:id/edit',util.isadminThree,function(req,res){
	lib.edit(req,res,Info.Info_Programming,Programming_Option);
});//edit
router.put('/ProgrammingBoard/:id',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Info.Info_Programming,Programming_Option);
});//update
router.delete('/ProgrammingBoard/:id',util.isPossibleDelete,function(req,res){
	lib.destroy(req,res,Info.Info_Programming,Programming_Option);
});//destroy

////comment
router.post('/ProgrammingBoard/:id/comments',util.isadminThree,function(req,res){
	lib.comment_push(req,res,Info.Info_Programming,Programming_Option);
});

router.delete('/ProgrammingBoard/:id/comments/:commentId',util.isadminThree,function(req,res){
	lib.comment_pull(req,res,Info.Info_Programming,Programming_Option);
});//destroy






//ProgrammingServer

router.get('/ProgrammingServer',function(req,res){
	lib.index(req,res,Info.Info_ProgrammingServer,ProgrammingServer_Option);
});//index
router.get('/ProgrammingServer/new',util.isadminThree,function(req,res){
	lib.new(req,res,Info.Info_ProgrammingServer,ProgrammingServer_Option);
});//new
router.post('/ProgrammingServer',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Info.Info_ProgrammingServer,ProgrammingServer_Option);
});//create
router.get('/ProgrammingServer/:id',util.isLoggedin,function(req,res){
	lib.show(req,res,Info.Info_ProgrammingServer,ProgrammingServer_Option);
});//show
router.get('/ProgrammingServer/:id/edit',util.isadminThree,function(req,res){
	lib.edit(req,res,Info.Info_ProgrammingServer,ProgrammingServer_Option);
});//edit
router.put('/ProgrammingServer/:id',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Info.Info_ProgrammingServer,ProgrammingServer_Option);
});//update
router.delete('/ProgrammingServer/:id',util.isPossibleDelete,function(req,res){
	lib.destroy(req,res,Info.Info_ProgrammingServer,ProgrammingServer_Option);
});//destroy

////comment
router.post('/ProgrammingServer/:id/comments',util.isadminThree,function(req,res){
	lib.comment_push(req,res,Info.Info_ProgrammingServer,ProgrammingServer_Option);
});

router.delete('/ProgrammingServer/:id/comments/:commentId',util.isadminThree,function(req,res){
	lib.comment_pull(req,res,Info.Info_ProgrammingServer,ProgrammingServer_Option);
});//destroy

//ProgrammingLanguage

router.get('/ProgrammingLanguage',function(req,res){
	lib.index(req,res,Info.Info_ProgrammingLanguage,ProgrammingLanguage_Option);
});//index
router.get('/ProgrammingLanguage/new',util.isadminThree,function(req,res){
	lib.new(req,res,Info.Info_ProgrammingLanguage,ProgrammingLanguage_Option);
});//new
router.post('/ProgrammingLanguage',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Info.Info_ProgrammingLanguage,ProgrammingLanguage_Option);
});//create
router.get('/ProgrammingLanguage/:id',util.isLoggedin,function(req,res){
	lib.show(req,res,Info.Info_ProgrammingLanguage,ProgrammingLanguage_Option);
});//show
router.get('/ProgrammingLanguage/:id/edit',util.isadminThree,function(req,res){
	lib.edit(req,res,Info.Info_ProgrammingLanguage,ProgrammingLanguage_Option);
});//edit
router.put('/ProgrammingLanguage/:id',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Info.Info_ProgrammingLanguage,ProgrammingLanguage_Option);
});//update
router.delete('/ProgrammingLanguage/:id',util.isPossibleDelete,function(req,res){
	lib.destroy(req,res,Info.Info_ProgrammingLanguage,ProgrammingLanguage_Option);
});//destroy

////comment
router.post('/ProgrammingLanguage/:id/comments',util.isadminThree,function(req,res){
	lib.comment_push(req,res,Info.Info_ProgrammingLanguage,ProgrammingLanguage_Option);
});

router.delete('/ProgrammingServer/:id/comments/:commentId',util.isadminThree,function(req,res){
	lib.comment_pull(req,res,Info.Info_ProgrammingLanguage,ProgrammingLanguage_Option);
});//destroy






//ProgrammingWeb

router.get('/ProgrammingWeb',function(req,res){
	lib.index(req,res,Info.Info_ProgrammingWeb,ProgrammingWeb_Option);
});//index
router.get('/ProgrammingWeb/new',util.isadminThree,function(req,res){
	lib.new(req,res,Info.Info_ProgrammingWeb,ProgrammingWeb_Option);
});//new
router.post('/ProgrammingWeb',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Info.Info_ProgrammingWeb,ProgrammingWeb_Option);
});//create
router.get('/ProgrammingWeb/:id',util.isLoggedin,function(req,res){
	lib.show(req,res,Info.Info_ProgrammingWeb,ProgrammingWeb_Option);
});//show
router.get('/ProgrammingWeb/:id/edit',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.edit(req,res,Info.Info_ProgrammingWeb,ProgrammingWeb_Option);
});//edit
router.put('/ProgrammingWeb/:id',util.isadminThree,function(req,res){
	lib.update(req,res,Info.Info_ProgrammingWeb,ProgrammingWeb_Option);
});//update
router.delete('/ProgrammingWeb/:id',util.isPossibleDelete,function(req,res){
	lib.destroy(req,res,Info.Info_ProgrammingWeb,ProgrammingWeb_Option);
});//destroy

////comment
router.post('/ProgrammingWeb/:id/comments',util.isadminThree,function(req,res){
	lib.comment_push(req,res,Info.Info_ProgrammingWeb,ProgrammingSWeb_Option);
});

router.delete('/ProgrammingWeb/:id/comments/:commentId',util.isadminThree,function(req,res){
	lib.comment_pull(req,res,Info.Info_ProgrammingWeb,ProgrammingWeb_Option);
});//destroy




//ProgrammingMobile

router.get('/ProgrammingMobile',function(req,res){
	lib.index(req,res,Info.Info_ProgrammingMobile,ProgrammingMobile_Option);
});//index
router.get('/ProgrammingMobile/new',util.isadminThree,function(req,res){
	lib.new(req,res,Info.Info_ProgrammingMobile,ProgrammingMobile_Option);
});//new
router.post('/ProgrammingMobile',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Info.Info_ProgrammingMobile,ProgrammingMobile_Option);
});//create
router.get('/ProgrammingMobile/:id',util.isLoggedin,function(req,res){
	lib.show(req,res,Info.Info_ProgrammingMobile,ProgrammingMobile_Option);
});//show
router.get('/ProgrammingMobile/:id/edit',util.isadminThree,function(req,res){
	lib.edit(req,res,Info.Info_ProgrammingMobile,ProgrammingMobile_Option);
});//edit
router.put('/ProgrammingMobile/:id',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Info.Info_ProgrammingMobile,ProgrammingMobile_Option);
});//update
router.delete('/ProgrammingMobile/:id',util.isPossibleDelete,function(req,res){
	lib.destroy(req,res,Info.Info_ProgrammingMobile,ProgrammingMobile_Option);
});//destroy

////comment
router.post('/ProgrammingMobile/:id/comments',util.isadminThree,function(req,res){
	lib.comment_push(req,res,Info.Info_ProgrammingMobile,ProgrammingMobile_Option);
});

router.delete('/ProgrammingMobile/:id/comments/:commentId',util.isadminThree,function(req,res){
	lib.comment_pull(req,res,Info.Info_ProgrammingMobile,ProgrammingMobile_Option);
});//destroy






////Exhibition

router.get('/Exhibition',function(req,res){
	lib.index(req,res,Info.Info_Exhibition,Exhibition_Option);
});//index
router.get('/Exhibition/new',util.isadminThree,function(req,res){
	lib.new(req,res,Info.Info_Exhibition,Exhibition_Option);
});//new
router.post('/Exhibition',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Info.Info_Exhibition,Exhibition_Option);
});//create
router.get('/Exhibition/:id',util.isLoggedin,function(req,res){
	lib.show(req,res,Info.Info_Exhibition,Exhibition_Option);
});//show
router.get('/Exhibition/:id/edit',util.isadminThree,function(req,res){
	lib.edit(req,res,Info.Info_Exhibition,Exhibition_Option);
});//edit
router.put('/Exhibition/:id',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Info.Info_Exhibition,Exhibition_Option);
});//update
router.delete('/Exhibition/:id',util.isPossibleDelete,function(req,res){
	lib.destroy(req,res,Info.Info_Exhibition,Exhibition_Option);
});//destroy

////comment
router.post('/Exhibition/:id/comments',util.isadminThree,function(req,res){
	lib.comment_push(req,res,Info.Info_Exhibition,Exhibition_Option);
});

router.delete('/Exhibition/:id/comments/:commentId',util.isadminThree,function(req,res){
	lib.comment_pull(req,res,Info.Info_Exhibition,Exhibition_Option);
});//destroy


////IT_info

router.get('/IT',function(req,res){
	lib.index(req,res,Info.Info_IT,IT_Option);
});//index
router.get('/IT/new',util.isadminThree,function(req,res){
	lib.new(req,res,Info.Info_IT,IT_Option);
});//new
router.post('/IT',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Info.Info_IT,IT_Option);
});//create
router.get('/IT/:id',util.isLoggedin,function(req,res){
	lib.show(req,res,Info.Info_IT,IT_Option);
});//show
router.get('/IT/:id/edit',util.isadminThree,function(req,res){
	lib.edit(req,res,Info.Info_IT,IT_Option);
});//edit
router.put('/IT/:id',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Info.Info_IT,IT_Option);
});//update
router.delete('/IT/:id',util.isPossibleDelete,function(req,res){
	lib.destroy(req,res,Info.Info_IT,IT_Option);
});//destroy

////comment
router.post('/IT/:id/comments',util.isadminThree,function(req,res){
	lib.comment_push(req,res,Info.Info_IT,IT_Option);
});

router.delete('/IT/:id/comments/:commentId',util.isadminThree,function(req,res){
	lib.comment_pull(req,res,Info.Info_IT,IT_Option);
});//destroy

////Job_info

router.get('/Job',function(req,res){
	lib.index(req,res,Info.Info_Job,Job_Option);
});//index
router.get('/Job/new',util.isadminThree,function(req,res){
	lib.new(req,res,Info.Info_Job,Job_Option);
});//new
router.post('/Job',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Info.Info_Job,Job_Option);
});//create
router.get('/Job/:id',util.isLoggedin,function(req,res){
	lib.show(req,res,Info.Info_Job,Job_Option);
});//show
router.get('/Job/:id/edit',util.isadminThree,function(req,res){
	lib.edit(req,res,Info.Info_Job,Job_Option);
});//edit
router.put('/Job/:id',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Info.Info_Job,Job_Option);
});//update
router.delete('/Job/:id',util.isPossibleDelete,function(req,res){
	lib.destroy(req,res,Info.Info_Job,Job_Option);
});//destroy

////comment
router.post('/Job/:id/comments',util.isadminThree,function(req,res){
	lib.comment_push(req,res,Info.Info_Job,Job_Option);
});

router.delete('/Job/:id/comments/:commentId',util.isadminThree,function(req,res){
	lib.comment_pull(req,res,Info.Info_Job,Job_Option);
});//destroy


router.get('/Hint',util.isadminThree,function(req,res){
	lib.index(req,res,Info.Info_Hint,Hint_Option);
});//index
router.get('/Hint/new',util.isadminThree,function(req,res){
	lib.new(req,res,Info.Info_Hint,Hint_Option);
});//new
router.post('/Hint',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.create(req,res,Info.Info_Hint,Hint_Option);
});//create
router.get('/Hint/:id',util.isadminThree,function(req,res){
	lib.show(req,res,Info.Info_Hint,Hint_Option);
});//show
router.get('/Hint/:id/edit',util.isadminThree,function(req,res){
	lib.edit(req,res,Info.Info_Hint,Hint_Option);
});//edit
router.put('/Hint/:id',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
	lib.update(req,res,Info.Info_Hint,Hint_Option);
});//update
router.delete('/Hint/:id',util.isPossibleDelete,function(req,res){
	lib.destroy(req,res,Info.Info_Hint,Hint_Option);
});//destroy

////comment
router.post('/Hint/:id/comments',util.isadminThree,function(req,res){
	lib.comment_push(req,res,Info.Info_Hint,Hint_Option);
});

router.delete('/Hint/:id/comments/:commentId',util.isadminThree,function(req,res){
	lib.comment_pull(req,res,Info.Info_Hint,Hint_Option);
});//destroy

module.exports = router;