var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = mongoose.Schema({
	title:{type:String, required:[true,"제목을 입력하세요."]},
  body:{type:String, required:[true,"본문을 입력하세요."]},
	author:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
	createdAt:{type:Date,default:Date.now},
	updatedAt:{type:Date},
	fileOriginalname : {type:String},
  	filePath : {type:String},
  	images : {type : Array},
	views: {type:Number, default:0},
	comments:[{
		author: {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
		body: {type:String, required:true},
		date: {type:Date, default:Date.now}
	}]
});

postSchema.methods.up_views = function(cb){
	this.views += 1;
	this.save(cb);
};

var Post_Board = mongoose.model('Post_Board',postSchema);
var Post_Inquire = mongoose.model('Post_Inquire',postSchema);
var Post_Study = mongoose.model('Post_Study',postSchema);
var Post_Food = mongoose.model('Post_Food',postSchema);

module.exports={
	Post_Board:Post_Board,
	Post_Inquire:Post_Inquire,
	Post_Study:Post_Study,
	Post_Food:Post_Food
};

