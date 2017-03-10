var express = require('express');
var fs = require('fs');
var multer  = require('multer');
var path = require('path');
var mkdirp = require('mkdirp');
var cloudinary = require('cloudinary');

var router = express.Router();


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
      // cb(null, Date.now() + '_' + file.originalname);
      cb(null,file.originalname);
  }
});
var upload = multer({storage : storage});
//
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OPG' });
});

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
