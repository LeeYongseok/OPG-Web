var express = require('express');
var router = express.Router();
var fs = require('fs');
var iPostMod = require('../models/photos');
var multer  = require('multer');
var path = require('path');
var mkdirp = require('mkdirp');
var util = require('../config/util.js');
var imglib = require('../config/ImgBoard_Controller.js');
var lib = require('../config/posts_controller.js');


var Activity_Option = {
  title: 'MT / Activity',
  path: 'photo/Activity'
};
var Study_Option = {
  title: 'Study',
  path:'photo/Study',
};
var Seminar_Option = {
  title: 'Seminar',
  path: 'photo/Seminar'
};
var Work_Option = {
  title: '작품',
  path: 'photo/Work'
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

//When connects to photo page - redirect to Activity page
router.get('/', function(req, res, next) {
  res.redirect('/photo/Activity');
});

//<-- Photo_MT_Activity ---
router.get('/Activity',function(req,res){
  imglib.index(req,res,iPostMod.iPostMod_Activity,Activity_Option);
 });

 router.get('/Activity/new',util.isadminThree,function(req,res){
  lib.new(req,res,iPostMod.iPostMod_Activity,Activity_Option);
 });

router.post('/Activity',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.create(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});

router.get('/Activity/:id',util.isLoggedin, function(req, res){
  lib.show(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});

router.get('/Activity/:id/edit', util.isadminThree, function(req,res){
  lib.edit(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});


router.put('/Activity/:id', util.isadminThree, upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.update(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});

router.delete('/Activity/:id', util.isPossibleDelete, function(req,res){
  lib.destroy(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});

////comment
router.post('/Activity/:id/comments',util.isadminThree,function(req,res){
  lib.comment_push(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});

router.delete('/Activity/:id/comments/:commentId',util.isadminThree,function(req,res){
  lib.comment_pull(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});//destroy

//---Photo_MT_Activity -->

//<-- Photo_Study ---
router.get('/Study',function(req,res){
  imglib.index(req,res,iPostMod.iPostMod_Study,Study_Option);
 });

 router.get('/Study/new',util.isadminThree,function(req,res){
  lib.new(req,res,iPostMod.iPostMod_Study,Study_Option);
 });

router.post('/Study',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.create(req,res,iPostMod.iPostMod_Study,Study_Option);
});

router.get('/Study/:id',util.isLoggedin, function(req, res){
  lib.show(req,res,iPostMod.iPostMod_Study,Study_Option);
});

router.get('/Study/:id/edit', util.isadminThree, function(req,res){
  lib.edit(req,res,iPostMod.iPostMod_Study,Study_Option);
});


router.put('/Study/:id', util.isadminThree, upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.update(req,res,iPostMod.iPostMod_Study,Study_Option);
});

router.delete('/Study/:id', util.isPossibleDelete, function(req,res){
  lib.destroy(req,res,iPostMod.iPostMod_Study,Study_Option);
});

////comment
router.post('/Study/:id/comments',util.isadminThree,function(req,res){
  lib.comment_push(req,res,iPostMod.iPostMod_Study,Study_Option);
});

router.delete('/Study/:id/comments/:commentId',util.isadminThree,function(req,res){
  lib.comment_pull(req,res,iPostMod.iPostMod_Study,Study_Option);
});//destroy

//---Photo_Study -->

//<-- Photo_Seminar ---
router.get('/Seminar',function(req,res){
  imglib.index(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
 });

 router.get('/Seminar/new',util.isadminThree,function(req,res){
  lib.new(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
 });

router.post('/Seminar',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.create(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});

router.get('/Seminar/:id',util.isLoggedin, function(req, res){
  lib.show(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});

router.get('/Seminar/:id/edit', util.isadminThree, function(req,res){
  lib.edit(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});


router.put('/Seminar/:id', util.isadminThree, upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.update(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});

router.delete('/Seminar/:id', util.isPossibleDelete, function(req,res){
  lib.destroy(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});

////comment
router.post('/Seminar/:id/comments',util.isadminThree,function(req,res){
  lib.comment_push(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});

router.delete('/Seminar/:id/comments/:commentId',util.isadminThree,function(req,res){
  lib.comment_pull(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});//destroy

//---Photo_Seminar -->

//<-- Photo_Work ---
router.get('/Work',function(req,res){
  imglib.index(req,res,iPostMod.iPostMod_Work,Work_Option);
 });

 router.get('/Work/new',util.isadminThree,function(req,res){
  lib.new(req,res,iPostMod.iPostMod_Work,Work_Option);
 });

router.post('/Work',util.isadminThree,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.create(req,res,iPostMod.iPostMod_Work,Work_Option);
});

router.get('/Work/:id',util.isLoggedin, function(req, res){
  lib.show(req,res,iPostMod.iPostMod_Work,Work_Option);
});

router.get('/Work/:id/edit', util.isadminThree, function(req,res){
  lib.edit(req,res,iPostMod.iPostMod_Work,Work_Option);
});


router.put('/Work/:id', util.isadminThree, upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.update(req,res,iPostMod.iPostMod_Work,Work_Option);
});

router.delete('/Work/:id', util.isPossibleDelete, function(req,res){
  lib.destroy(req,res,iPostMod.iPostMod_Work,Work_Option);
});

////comment
router.post('/Work/:id/comments',util.isadminThree,function(req,res){
  lib.comment_push(req,res,iPostMod.iPostMod_Work,Work_Option);
});

router.delete('/Work/:id/comments/:commentId',util.isadminThree,function(req,res){
  lib.comment_pull(req,res,iPostMod.iPostMod_Work,Work_Option);
});//destroy

//---Photo_Work-->

module.exports = router;
