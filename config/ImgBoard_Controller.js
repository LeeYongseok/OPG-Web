var fs = require('fs');
var path = require('path');

exports.index = function(req,res,schema,option){
  var limit = 9;
  var page = req.query.page;
  if(page === undefined) {page = 1;}
  page = parseInt(page);
  schema.count({}, function(err, count) {
    if(err) return res.json({success:false, message:err});
    var skip = (page-1)*limit;
    var maxPageNum = Math.ceil(count/limit);
    schema.find({}).populate("author").sort('-createdAt').skip(skip).limit(limit).exec(function(err, data) {
      if(err) return res.json({success:false, message:err});
      res.render("../views/ImgBoard/imgPost_Index",{
  			data: data,
        title: option.title,
        main_menu: option.title,
        path: option.path,
        page: page,
        maxPageNum:maxPageNum
  		 });
     });
   });
};

exports.new = function(req,res,schema,option){
  res.render("../views/ImgBoard/imgPost_New",{
      title: option.title,
      main_menu: option.title,
      path: option.path,
      page: req.query.page
    });
};

exports.create = function(req,res,schema,option){
  req.body.author = req.user._id;
  if(req.body.images) {req.body.images = JSON.parse(req.body.images);}
  if(req.files.file !== undefined) {
    req.body.filePath = req.files.file[0].path;
    req.body.fileOriginalname = req.files.file[0].originalname;
  }
  for(var i in req.files.files) {
    fs.unlink(req.files.files[i].path);
  }
	schema.create(req.body,function(err,data){
		if(err) return res.json({success:false, message:err});
		res.redirect('/' + option.path);
	});
};

exports.show = function(req,res,schema,option){
  schema.findById(req.params.id).populate(['author','comments.author']).exec(function(err, data){
    if(err) return res.json({success:false, message:err});
    res.render('ImgBoard/imgPost_View', {
      data:data,
      title: option.title,
      main_menu: option.title,
      page: req.query.page,
      path: option.path
    });
  });
};

exports.edit = function(req,res,schema,option){
  schema.findById(req.params.id, function(err, data){
    if(err) return res.json({success:false, message:err});
    if(!req.user._id.equals(data.author)) return res.json({success:false, message:"Unauthrized Attempt"});
    res.render('ImgBoard/imgPost_Edit', {
      data: data,
      title: option.title,
      main_menu: option.title + '글 수정',
      path: option.path,
      page: req.query.page
    });
  });
};

exports.update = function(req,res,schema,option){
  if(req.body.images) {req.body.images = JSON.parse(req.body.images);}
  if(req.files.file !== undefined) {
    req.body.filePath = req.files.file[0].path;
    req.body.fileOriginalname = req.files.file[0].originalname;
  }
  for(var i in req.files.files) {
    fs.unlink(req.files.files[i].path);
  }
  req.body.updatedAt=Date.now();
  schema.findByIdAndUpdate({_id:req.params.id, author:req.user._id},req.body,function(err,data){
    if(err) return res.json({success:false, message:err});
    if(!data) return res.json({success:false, message:"No data found to update"});
    res.redirect(req.params.id + '?page=' + req.query.page);
  });
};

exports.destroy = function(req,res,schema,option){
  schema.findByIdAndRemove({_id:req.params.id, author:req.user._id}, function(err, data){
    if(err) return res.json({success:false, message:err});
    if(!data) return res.json({success:false, message:"No data found to remove"});
    if(data.filename !== undefined){
      fs.unlink(path.join(__dirname,'..','public','uploadedfiles',data.filename));
    }
    res.redirect('/' + option.path);
  });
};

exports.comment_push = function(req,res,schema,option){
  var newComment = req.body.comment;
  newComment.author = req.user._id;
  schema.update({_id:req.params.id},{$push:{comments:newComment}},function(err,post){
    if(err) return res.json({success:false, message:err});
    res.redirect('/'+option.path+'/'+req.params.id);
  });
};

exports.comment_pull = function(req,res,schema,option){
	schema.update({_id:req.params.id},{$pull:{comments:{_id:req.params.commentId}}},function(err,post){
	if(err) return res.json({success:false, message:err});
	res.redirect('/'+option.path+'/'+req.params.id);
	});
};
