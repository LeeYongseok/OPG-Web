var fs = require('fs');
var path = require('path');
var cloudinary = require('cloudinary');
var async = require('async');
var Users=require('../models/User');
var util=require('../config/util.js');
var mongoose = require('mongoose');


exports.index = function(req,res,schema,option){
	if(!req.user){
		req.session.redirectTo= '/'+option.path;
	}
	var limit = 10;
  	var page = req.query.page;
  	var search = util.createSearch(req.query);
  	if(page === undefined) {page = 1;}
  	page = parseInt(page);
  	async.waterfall([function(callback){
	  		if(!search.findUser) return callback(null);
			Users.find(search.findUser,function(err,users){
				if(err) callback(err);
				var or=[];
				users.forEach(function(user){
					or.push({author:mongoose.Types.ObjectId(user._id)});
				});
				if(search.findText.$or){
					search.findText.$or = search.findText.$or.concat(or);
				}else if(or.length>0){
					search.findText = {$or:or};
				}
				callback(null);
			});
	  	},function(callback){
	  		if(search.findUser&& !search.findText.$or)return callback(null,null,0,0);
	  		schema.count(search.findText,function(err,count){
	  		if(err){callback(err);}
	    	skip = (page-1)*limit;
	    	maxPageNum = Math.ceil(count/limit);
	    	callback(null,skip,maxPageNum,count);
			});
	  	},function (skip,maxPageNum,count,callback){
	  		if(search.findUser&&!search.findText.$or)return callback(null,[],0,0);
	  		schema.find(search.findText).populate('author').sort('-createdAt').skip(skip).limit(limit).exec(function(err,posts){
				if(err) {return callback(err);}
				callback(null,posts,maxPageNum,count);
			});
	  	}],function(err,posts,maxPageNum,count){
	  		if(err) return res.json({success:false, message:err});
	  		res.render("../views/PostBoard/post_index",{
					data:posts,
					title: option.title,
					main_menu: option.title,
					path:option.path,
					page:page,
					maxPageNum:maxPageNum,
					search:search,
					count:count,
					urlQuery:req._parsedUrl.query,
					user:req.user
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
	async.waterfall([
		function(callback){
				cloudinaryfileupload(req, function(){
					callback(null,req);
				});
		}],
		function(err,req){
			req.body.post.author = req.user._id;
			if(req.body.images) {req.body.images = JSON.parse(req.body.images);}
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
		}
	);
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
	async.waterfall([
		function(callback){
				cloudinaryfileupload(req, function(){
					callback(null,req);
				});
		}],
		function(err,req){
			if(req.body.images) {req.body.images = JSON.parse(req.body.images);}
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
	 }
 );
};

exports.destroy = function(req,res,schema,option){
	schema.findOne({_id:req.params.id},function(err,post){
		if(post.author=mongoose.Types.ObjectId(req.user._id)||req.user.admin==1){
			post.remove(function(err){
				if(err) return res.json({success:false, message:err});

			});
			if(post.filename !== undefined){
      		fs.unlink(path.join(__dirname,'..','public','uploadedfiles',data.filename));
    		};
		};
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to remove"});
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


exports.latest_list = function(array,expire_date,schema,option,callback){
	if(!schema) return callback(null,array);		
	schema.find({"createdAt":{"$gt":expire_date}}).populate('author').exec(function(err,posts){
	  	if(err) return callback(null,array);
		posts.forEach(function(post){
			array.push({post:post,path:option.path,title:option.title});		
		});
		callback(null,array);
	}); // limit을 지정해 줌으로서 너무 많은 양의 포스트 들이 올라갔을 때 적절히 제한 해 주는 역활을 한다. query를 추가하는 것이 속도개선에 유리한듯하다.
};

function cloudinaryfileupload(req, callback){
	if(req.files.file !== undefined){
		cloudinary.uploader.upload(req.files.file[0].path, function(result) {
				if(result && req.files.file[0].path !== undefined){
					req.body.post.filePath = result.secure_url;
					req.body.post.fileOriginalname = req.files.file[0].originalname;
					fs.unlink(path.join(req.files.file[0].path));
					console.log("LocalTemporary File Deleted");
					callback();
				}
			}, { resource_type: 'auto', use_filename: true, unique_filename: true});
		} else callback();
}
