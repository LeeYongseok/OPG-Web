var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noticeSchema = mongoose.Schema({
	title:{type:String, required:[true,"제목을 입력하세요."]},
  body:{type:String, required:[true,"본문을 입력하세요."]},
	author:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
	createdAt:{type:Date,default:Date.now},
	updatedAt:Date,
    views: {type:Number, default:0},
	comments:[{
		author: {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
		body: {type:String, required:true},
		date: {type:Date, default:Date.now}
	}]
});


noticeSchema.methods.up_views = function(cb){
	this.views += 1;
	this.save(cb);
};

var notice_Board = mongoose.model('notice_Board',noticeSchema);

module.exports={
    notice_Board:notice_Board
};
