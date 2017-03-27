var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var infoSchema = mongoose.Schema({
	title:{type:String, required:[true,"제목을 입력하세요."]},
  body:{type:String, required:[true,"본문을 입력하세요."]},
	author:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
	createdAt:{type:Date,default:Date.now},
	updatedAt:Date,
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

infoSchema.methods.up_views = function(cb){
	this.views += 1;
	this.save(cb);
}

var Info_Programming = mongoose.model('Info_Programming',infoSchema);
var Info_ProgrammingServer = mongoose.model('Info_ProgrammingServer',infoSchema);
var Info_ProgrammingLanguage = mongoose.model('Info_ProgrammingLanguage',infoSchema);
var Info_ProgrammingWeb = mongoose.model('Info_ProgrammingWeb',infoSchema);
var Info_ProgrammingMobile = mongoose.model('Info_ProgrammingMobile',infoSchema);
var Info_Exhibition = mongoose.model('Info_Exhibition',infoSchema);
var Info_IT = mongoose.model('Info_IT',infoSchema);
var Info_Job = mongoose.model('Info_Job',infoSchema);
var Info_Hint = mongoose.model('Info_Hint',infoSchema);


module.exports={
	Info_Programming:Info_Programming,
    Info_ProgrammingServer:Info_ProgrammingServer,
    Info_ProgrammingLanguage:Info_ProgrammingLanguage,
    Info_ProgrammingWeb:Info_ProgrammingWeb,
    Info_ProgrammingMobile:Info_ProgrammingMobile,
	Info_Exhibition:Info_Exhibition,
	Info_IT:Info_IT,
	Info_Job:Info_Job,
	Info_Hint:Info_Hint
};
