var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noticeSchema = mongoose.Schema({
	title:{type:String, required:true},
	body:{type:String, required:true},
	author:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
	createdAt:{type:Date,default:Date.now},
	updatedAt:Date,
	comments:[{
		author: {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
		body: {type:String, required:true},
		date: {type:Date, default:Date.now}
	}]
});


var notice_Board = mongoose.model('notice_Board',noticeSchema);

module.exports={
    notice_Board:notice_Board
};