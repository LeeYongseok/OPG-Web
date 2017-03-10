var util = {};

util.isLoggedin = function(req,res,next){
	if(req.isAuthenticated()){
		next();
	}else{
		req.flash("errors", {login:"Please login first"});
  		res.redirect("/");
	}
};

util.isadminOne = function(req,res,next){
	if(req.isAuthenticated() && req.user.admin===1){
		next();
	}else{
		req.flash("errors", {login:"Not admin"});
  		res.redirect("/");
	}
};

util.createSearch = function(queries){
	var searchType=queries.searchType;
	var findText={};
	var findUser=null;
	var postQuery=[];
	if(queries.searchType && queries.searchText && queries.searchText.length >0){
		//javascript indexOf(찾는이름) 없으면 -1 있으면 0이상의 수
		if(searchType.indexOf("title")>=0){
			postQuery.push({title:{$regex:new RegExp(queries.searchText,"i")}});
		}
		if(searchType.indexOf("author")>=0){
			findUser={name:{$regex:new RegExp(queries.searchText,"i")}};
		}
	}
		if(postQuery.length>0) findText = {$or:postQuery};
	return {searchType:queries.searchType, searchText:queries.searchText, findText:findText, findUser:findUser};
};



module.exports = util;
