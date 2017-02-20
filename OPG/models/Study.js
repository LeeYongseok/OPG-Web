var mongoose = require('mongoose');

var postSchema_study = mongoose.Schema({
	title:{type:String, required:true},
	body:{type:String, required:true},
	createdAt:{type:Date,default:Date.now},
	updatedAt:Date
});

var Study = mongoose.model('study',postSchema_study);

module.exports=Study;