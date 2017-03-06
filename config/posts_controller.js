var fs = require('fs');
var path = require('path');

exports.index = function(req,res,schema,option){
	var limit = 10;
  	var page = req.query.page;
  	if(page === undefined) {page = 1;}
  	page = parseInt(page);
  	schema.count({},function(err,count){
  		if(err) return res.json({success:false, message:err});
    	var skip = (page-1)*limit;
    	var maxPageNum = Math.ceil(count/limit);
		schema.find({}).populate('author').sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("../views/PostBoard/post_index",{
			data:posts,
			title: option.title,
			main_menu: option.title,
			path:option.path,
			page:page,
			maxPageNum:maxPageNum,
			user:req.user
		});
	});
	});
};

exports.new = function(req,res,schema,option){
	var user = req.flash("user")[0] || {};
	var errors = req.flash("errors")[0] || {};
	res.render("../views/PostBoard/post_new",{
		title: option.title,
		main_menu: option.title+' 글 쓰기',
		path:option.path,
		page:req.query.page,
		user:user, errors:errors
	});
};


exports.create = function(req,res,schema,option){
	req.body.post.author = req.user._id;
	if(req.body.images) {req.body.images = JSON.parse(req.body.images);}
	if(req.files.file !== undefined) {
	  req.body.post.filePath = req.files.file[0].path;
	  req.body.post.fileOriginalname = req.files.file[0].originalname;
	}
	for(var i in req.files.files) {
	  fs.unlink(req.files.files[i].path);
	}
	schema.create(req.body.post,function(err,post){
		if(err){
			req.flash("user", req.body);
			req.flash("errors", parseError(err));
			return res.redirect("/"+option.path+"/new");
		}
		res.redirect('/'+option.path);
	});
};

exports.show = function(req,res,schema,option){
	schema.findById(req.params.id).populate(['author','comments.author']).exec(function(err,post){
		if(err) return res.json({success:false, message:err});
		post.up_views(function(err,post){
			if(err) return res.json({success:false, message:err});
		});
		res.render('../views/PostBoard/post_view',{
			data:post,
			title: option.title,
			main_menu: option.title,
			page: req.query.page,
			path:option.path,
			user:req.user
		});
	});

};

exports.edit = function(req,res,schema,option){
	var user = req.flash("user")[0];
	var errors = req.flash("errors")[0] || {};
	schema.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!req.user._id.equals(post.author))return res.json({success:false, message:"Unauthrized Attempt"});
		res.render('../views/PostBoard/post_edit',{
			data:post,
			title: option.title,
			main_menu: option.title+' 글 수정',
			page: req.query.page,
			path:option.path,
			user:req.user,
			User:user, errors: errors
		});
	});
};


exports.update = function(req,res,schema,option){
	if(req.body.images) {req.body.images = JSON.parse(req.body.images);}
    if(req.files.file !== undefined) {
	  req.body.post.filePath = req.files.file[0].path;
	  req.body.post.fileOriginalname = req.files.file[0].originalname;
	}
    for(var i in req.files.files) {
      fs.unlink(req.files.files[i].path);
    }
	req.body.post.updatedAt=Date.now();
 schema.findOne({_id:req.params.id, author:req.user._id})
 .exec(function(err, data){
  if(err) return res.json(err);

  // update user object
  for(var p in req.body.post){
 	data[p] = req.body.post[p];
  }
  // save updated user
  data.save(function(err, user){
  if(err){
 	 req.flash("user", req.body);
 	 req.flash("errors", parseError(err));
 	 return res.redirect("/"+option.path+"/"+req.params.id+"/edit");
 	}
 	res.redirect(req.params.id+ "?page=" +req.query.page);
  });
 });
};

exports.destroy = function(req,res,schema,option){
	schema.findOneAndRemove({_id:req.params.id, author:req.user._id},function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to remove"});
		if(post.filename !== undefined){
      		fs.unlink(path.join(__dirname,'..','public','uploadedfiles',data.filename));
    	}
		res.redirect('/'+option.path);
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

function parseError(errors){
 var parsed = {};
 if(errors.name == 'ValidationError'){
  for(var name in errors.errors){
   var validationError = errors.errors[name];
   parsed[name] = { message:validationError.message };
 } // mongoose에서 발생하는 validationError message를 변환
 } else if(errors.code == "11000" ) {
   if(errors.errmsg.indexOf("id") > 0){
     parsed.id = { message:"이미 존재하는 아이디 입니다." };
   } else if(errors.errmsg.indexOf("tel") > 0){
     parsed.tel = { message:"이미 존재하는 번호 입니다." };
   } else if(errors.errmsg.indexOf("mail") > 0){
     parsed.mail = { message:"이미 존재하는 e-mail 입니다." };
   }
  // mongoDB에서 id의 error를 처리
 } else {
  parsed.unhandled = JSON.stringify(errors);
 }
 return parsed;
}
