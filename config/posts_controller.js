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
		res.render("post_index",{
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
	res.render("post_new",{
		title: option.title,
		main_menu: option.title+' 글 쓰기',
		path:option.path,
		page:req.query.page
	});
};


exports.create = function(req,res,schema,option){
	req.body.post.author = req.user._id;
	schema.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/'+option.path);
	});
};

exports.show = function(req,res,schema,option){
	schema.findById(req.params.id).populate(['author','comments.author']).exec(function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
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
	schema.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!req.user._id.equals(post.author))return res.json({success:false, message:"Unauthrized Attempt"});
		res.render('post_edit',{
			data:post,
			title: option.title,
			main_menu: option.title+' 글 수정',
			page: req.query.page,
			path:option.path,
			user:req.user
		});
	});
};


exports.update = function(req,res,schema,option){
	req.body.post.updatedAt=Date.now();
	schema.findOneAndUpdate({_id:req.params.id, author:req.user._id},req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		if(!post) return res.json({success:false, message:"No data found to update"});
		res.redirect(req.params.id+ "?page=" +req.query.page);
	});
};

exports.destroy = function(req,res,schema,option){
	schema.findOneAndRemove({_id:req.params.id, author:req.user._id},function(err,post){
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

