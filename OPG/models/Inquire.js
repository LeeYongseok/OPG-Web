var mongoose = require('mongoose');

var postSchema_inquire = mongoose.Schema({
	title:{type:String, required:true},
	body:{type:String, required:true},
	createdAt:{type:Date,default:Date.now},
	updatedAt:Date
});

var Inquire = mongoose.model('inquire',postSchema_inquire);

module.exports=Inquire;