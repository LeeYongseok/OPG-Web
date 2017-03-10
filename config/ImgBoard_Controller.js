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
      res.render("../views/PostBoard/imgPost_Index",{
  			data: data,
        title: option.title,
        main_menu: option.title,
        path: option.path,
        page: page,
        maxPageNum:maxPageNum,
        user:req.user
  		 });
     });
   });
};
