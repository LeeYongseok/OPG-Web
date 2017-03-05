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

module.exports = util;
