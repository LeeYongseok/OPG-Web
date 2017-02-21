var express = require('express');
var router = express.Router();
var fs = require('fs');
var PhotoMods = require("../models/photos");
var multer  = require('multer');

//for multipart form post
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploadedimages');
  },
  filename: function (req, file, cb) {
      // cb(null, file.originalname);
      var originalname = file.originalname;
      var extension = originalname.split(".");
      cb(null, Date.now() + '.' + extension[extension.length-1]);
  }
});
var upload = multer({ storage : storage});
//

//Each different photo gallery [Activity, Study, Seminar]

//If connects to photo page - redirect to Activity page
router.get('/', function(req, res, next) {
  res.redirect('/photo/Activity');
  // res.render('../views/PhotoGallery/photo', {
  //   title: 'Photo Gallery',
  //   main_menu: 'Photo Gallery',
  //   path:'photo'
  // });
});

//<-- Photo_MT_Activity ---
router.get('/Activity',function(req,res){
  var limit = 9;
  var page = req.query.page;
  if(page === undefined) {page = 1;}
  page = parseInt(page);
  //   //var page = Math.max(1,req.query.page);
  //   var page = ((req.query.page)===undefined)?1:req.query.page;
  //   //if(page===undefined) {page = 1;}
  PhotoMods.PhotoMod_Activity.count({}, function(err, count) {
    if(err) return res.json({success:false, message:err});
    var skip = (page-1)*limit;
    var maxPageNum = Math.ceil(count/limit);
    PhotoMods.PhotoMod_Activity.find({}).sort('-createdAt').skip(skip).limit(limit).exec(function(err, photos) {
      if(err) return res.json({success:false, message:err});
      res.render("../views/PhotoGallery/photo",{
  			data: photos,
        title: 'Photo_MT_Activity',
        main_menu: 'MT & 활동',
        path: 'photo/Activity',
        page: page,
        maxPageNum:maxPageNum
  		 });
     });
   });
 });

 router.get('/Activity/new',function(req,res){
 	res.render("../views/PhotoGallery/photo_new",{
 			title: 'Photo_MT_Activity',
 			main_menu: 'MT & 활동',
 			path:'photo/Activity',
      page: req.query.page
 		});
 });

router.post('/Activity',upload.single('photo'),function(req,res){
  if(req.file !== undefined){
    req.body.filename = req.file.filename;
  }
	PhotoMods.PhotoMod_Activity.create(req.body,function(err,photos){
		if(err) return res.json({success:false, message:err});
		res.redirect('/photo/Activity');
	});
});

router.get('/Activity/:id', function(req, res){
  PhotoMods.PhotoMod_Activity.findOne({_id:req.params.id}, function(err, photos){
    if(err) return res.json(err);
    res.render('PhotoGallery/photo_view', {
      photodata:photos,
      title: 'Photo_MT_Activity',
      main_menu: 'MT & 활동',
      page: req.query.page,
      path:'photo/Activity'
    });
  });
});

router.get('/Activity/:id/edit', function(req,res){
  PhotoMods.PhotoMod_Activity.findById(req.params.id, function(err, photos){
    if(err) return res.json({success:false, message:err});
    res.render('PhotoGallery/photo_edit', {
      photodata:photos,
      title: 'Photo_MT_Activity',
      main_menu: ' MT & 활동',
      path:'photo/Activity',
      page: req.query.page
    });
  });
});

router.put('/Activity/:id',upload.single('photo'),function(req,res){
  if(req.file !== undefined){
    req.body.filename = req.file.filename;
  }
	req.body.updatedAt=Date.now();
	PhotoMods.PhotoMod_Activity.findByIdAndUpdate(req.params.id,req.body,function(err,photos){
		if(err) return res.json({success:false, message:err});
		res.redirect(req.params.id + '?page=' + req.query.page);
	});
});

router.delete('/Activity/:id', function(req,res){
	PhotoMods.PhotoMod_Activity.findByIdAndRemove(req.params.id, function(err, photos){
		if(err) {
      return res.json({success:false, message:err});
    }
    if(photos.filename !== undefined){
      fs.unlink('../public/uploadedimages/' + photos.filename);
    }
		res.redirect('/photo/Activity');
	});
});
//---Photo_MT_Activity -->

//<-- Photo_Study ---
router.get('/Study',function(req,res){
  var limit = 9;
  var page = req.query.page;
  if(page === undefined) {page = 1;}
  page = parseInt(page);
  PhotoMods.PhotoMod_Study.count({}, function(err, count) {
    if(err) return res.json({success:false, message:err});
    var skip = (page-1)*limit;
    var maxPageNum = Math.ceil(count/limit);
    PhotoMods.PhotoMod_Study.find({}).sort('-createdAt').skip(skip).limit(limit).exec(function(err, photos) {
      if(err) return res.json({success:false, message:err});
      res.render("../views/PhotoGallery/photo",{
  			data: photos,
        title: 'Photo_Study',
        main_menu: 'Study',
        path: 'photo/Study',
        page: page,
        maxPageNum:maxPageNum
  		 });
     });
   });
 });

 router.get('/Study/new',function(req,res){
 	res.render("../views/PhotoGallery/photo_new",{
 			title: 'Photo_Study',
 			main_menu: 'Study',
 			path:'photo/Study',
      page: req.query.page
 		});
 });

router.post('/Study',upload.single('photo'),function(req,res){
  if(req.file !== undefined){
    req.body.filename = req.file.filename;
  }
	PhotoMods.PhotoMod_Study.create(req.body,function(err,photos){
		if(err) return res.json({success:false, message:err});
		res.redirect('/photo/Study');
	});
});

router.get('/Study/:id', function(req, res){
  PhotoMods.PhotoMod_Study.findOne({_id:req.params.id}, function(err, photos){
    if(err) return res.json(err);
    res.render('PhotoGallery/photo_view', {
      photodata:photos,
      title: 'Photo_Study',
      main_menu: 'Study',
      page: req.query.page,
      path:'photo/Study'
    });
  });
});

router.get('/Study/:id/edit', function(req,res){
  PhotoMods.PhotoMod_Study.findById(req.params.id, function(err, photos){
    if(err) return res.json({success:false, message:err});
    res.render('PhotoGallery/photo_edit', {
      photodata:photos,
      title: 'Photo_Study',
      main_menu: ' Study',
      path:'photo/Study',
      page: req.query.page
    });
  });
});

router.put('/Study/:id',upload.single('photo'),function(req,res){
  if(req.file !== undefined){
    req.body.filename = req.file.filename;
  }
	req.body.updatedAt=Date.now();
	PhotoMods.PhotoMod_Study.findByIdAndUpdate(req.params.id,req.body,function(err,photos){
		if(err) return res.json({success:false, message:err});
		res.redirect(req.params.id + '?page=' + req.query.page);
	});
});

router.delete('/Study/:id', function(req,res){
	PhotoMods.PhotoMod_Study.findByIdAndRemove(req.params.id, function(err, photos){
		if(err) {
      return res.json({success:false, message:err});
    }
    if(photos.filename !== undefined){
      fs.unlink('../public/uploadedimages/' + photos.filename);
    }
		res.redirect('/photo/Study');
	});
});
//---Photo_Study -->

//<-- Photo_Seminar ---
router.get('/Seminar',function(req,res){
  var limit = 9;
  var page = req.query.page;
  if(page === undefined) {page = 1;}
  page = parseInt(page);
  PhotoMods.PhotoMod_Seminar.count({}, function(err, count) {
    if(err) return res.json({success:false, message:err});
    var skip = (page-1)*limit;
    var maxPageNum = Math.ceil(count/limit);
    PhotoMods.PhotoMod_Seminar.find({}).sort('-createdAt').skip(skip).limit(limit).exec(function(err, photos) {
      if(err) return res.json({success:false, message:err});
      res.render("../views/PhotoGallery/photo",{
  			data: photos,
        title: 'Photo_Seminar',
        main_menu: 'Seminar',
        path: 'photo/Seminar',
        page: page,
        maxPageNum:maxPageNum
  		 });
     });
   });
 });

 router.get('/Seminar/new',function(req,res){
 	res.render("../views/PhotoGallery/photo_new",{
 			title: 'Photo_Seminar',
 			main_menu: 'Seminar',
 			path:'photo/Seminar',
      page: req.query.page
 		});
 });

router.post('/Seminar',upload.single('photo'),function(req,res){
  if(req.file !== undefined){
    req.body.filename = req.file.filename;
  }
	PhotoMods.PhotoMod_Seminar.create(req.body,function(err,photos){
		if(err) return res.json({success:false, message:err});
		res.redirect('/photo/Seminar');
	});
});

router.get('/Seminar/:id', function(req, res){
  PhotoMods.PhotoMod_Seminar.findOne({_id:req.params.id}, function(err, photos){
    if(err) return res.json(err);
    res.render('PhotoGallery/photo_view', {
      photodata:photos,
      title: 'Photo_Seminar',
      main_menu: 'Seminar',
      page: req.query.page,
      path:'photo/Seminar'
    });
  });
});

router.get('/Seminar/:id/edit', function(req,res){
  PhotoMods.PhotoMod_Seminar.findById(req.params.id, function(err, photos){
    if(err) return res.json({success:false, message:err});
    res.render('PhotoGallery/photo_edit', {
      photodata:photos,
      title: 'Photo_Seminar',
      main_menu: ' Seminar',
      path:'photo/Seminar',
      page: req.query.page
    });
  });
});

router.put('/Seminar/:id',upload.single('photo'),function(req,res){
  if(req.file !== undefined){
    req.body.filename = req.file.filename;
  }
	req.body.updatedAt=Date.now();
	PhotoMods.PhotoMod_Seminar.findByIdAndUpdate(req.params.id,req.body,function(err,photos){
		if(err) return res.json({success:false, message:err});
		res.redirect(req.params.id + '?page=' + req.query.page);
	});
});

router.delete('/Seminar/:id', function(req,res){
	PhotoMods.PhotoMod_Seminar.findByIdAndRemove(req.params.id, function(err, photos){
		if(err) {
      return res.json({success:false, message:err});
    }
    if(photos.filename !== undefined){
      fs.unlink('../public/uploadedimages/' + photos.filename);
    }
		res.redirect('/photo/Seminar');
	});
});
//---Photo_Seminar -->

module.exports = router;
