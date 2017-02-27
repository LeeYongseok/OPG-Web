var express = require('express');
var router = express.Router();
var fs = require('fs');
var iPostMod = require('../models/photos');
var multer  = require('multer');
var path = require('path');
var mkdirp = require('mkdirp');
var util = require('../config/util.js');
var cloudinary = require('cloudinary');
var lib = require('../config/ImgBoard_Controller.js');


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
      // cb(null, Date.now() + '.' + extension[extension.length-1]);
      cb(null, Date.now() + '_' + file.originalname);
      // cb(null,file.originalname);
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
  lib.index(req,res,iPostMod.iPostMod_Activity,Activity_Option);
 });

 router.get('/Activity/new',util.isLoggedin,function(req,res){
  lib.new(req,res,iPostMod.iPostMod_Activity,Activity_Option);
 });

router.post('/Activity',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.create(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});

router.get('/Activity/:id', function(req, res){
  lib.show(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});

router.get('/Activity/:id/edit', util.isLoggedin, function(req,res){
  lib.edit(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});


router.put('/Activity/:id', util.isLoggedin, upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.update(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});

router.delete('/Activity/:id', util.isLoggedin, function(req,res){
  lib.destory(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});

////comment
router.post('/Activity/:id/comments',function(req,res){
  lib.comment_push(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});

router.delete('/Activity/:id/comments/:commentId',function(req,res){
  lib.commnet_pull(req,res,iPostMod.iPostMod_Activity,Activity_Option);
});//destroy

//---Photo_MT_Activity -->

//<-- Photo_Study ---
router.get('/Study',function(req,res){
  lib.index(req,res,iPostMod.iPostMod_Study,Study_Option);
 });

 router.get('/Study/new',util.isLoggedin,function(req,res){
  lib.new(req,res,iPostMod.iPostMod_Study,Study_Option);
 });

router.post('/Study',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.create(req,res,iPostMod.iPostMod_Study,Study_Option);
});

router.get('/Study/:id', function(req, res){
  lib.show(req,res,iPostMod.iPostMod_Study,Study_Option);
});

router.get('/Study/:id/edit', util.isLoggedin, function(req,res){
  lib.edit(req,res,iPostMod.iPostMod_Study,Study_Option);
});


router.put('/Study/:id', util.isLoggedin, upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.update(req,res,iPostMod.iPostMod_Study,Study_Option);
});

router.delete('/Study/:id', util.isLoggedin, function(req,res){
  lib.destory(req,res,iPostMod.iPostMod_Study,Study_Option);
});

////comment
router.post('/Study/:id/comments',function(req,res){
  lib.comment_push(req,res,iPostMod.iPostMod_Study,Study_Option);
});

router.delete('/Study/:id/comments/:commentId',function(req,res){
  lib.commnet_pull(req,res,iPostMod.iPostMod_Study,Study_Option);
});//destroy

//---Photo_Study -->

//<-- Photo_Seminar ---
router.get('/Seminar',function(req,res){
  lib.index(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
 });

 router.get('/Seminar/new',util.isLoggedin,function(req,res){
  lib.new(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
 });

router.post('/Seminar',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.create(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});

router.get('/Seminar/:id', function(req, res){
  lib.show(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});

router.get('/Seminar/:id/edit', util.isLoggedin, function(req,res){
  lib.edit(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});


router.put('/Seminar/:id', util.isLoggedin, upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.update(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});

router.delete('/Seminar/:id', util.isLoggedin, function(req,res){
  lib.destory(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});

////comment
router.post('/Seminar/:id/comments',function(req,res){
  lib.comment_push(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});

router.delete('/Seminar/:id/comments/:commentId',function(req,res){
  lib.commnet_pull(req,res,iPostMod.iPostMod_Seminar,Seminar_Option);
});//destroy

//---Photo_Seminar -->

//<-- Photo_Work ---
router.get('/Work',function(req,res){
  lib.index(req,res,iPostMod.iPostMod_Work,Work_Option);
 });

 router.get('/Work/new',util.isLoggedin,function(req,res){
  lib.new(req,res,iPostMod.iPostMod_Work,Work_Option);
 });

router.post('/Work',util.isLoggedin,upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.create(req,res,iPostMod.iPostMod_Work,Work_Option);
});

router.get('/Work/:id', function(req, res){
  lib.show(req,res,iPostMod.iPostMod_Work,Work_Option);
});

router.get('/Work/:id/edit', util.isLoggedin, function(req,res){
  lib.edit(req,res,iPostMod.iPostMod_Work,Work_Option);
});


router.put('/Work/:id', util.isLoggedin, upload.fields([{name:'file'},{name:'files'}]),function(req,res){
  lib.update(req,res,iPostMod.iPostMod_Work,Work_Option);
});

router.delete('/Work/:id', util.isLoggedin, function(req,res){
  lib.destory(req,res,iPostMod.iPostMod_Work,Work_Option);
});

////comment
router.post('/Work/:id/comments',function(req,res){
  lib.comment_push(req,res,iPostMod.iPostMod_Work,Work_Option);
});

router.delete('/Work/:id/comments/:commentId',function(req,res){
  lib.commnet_pull(req,res,iPostMod.iPostMod_Work,Work_Option);
});//destroy

//---Photo_Work-->


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
