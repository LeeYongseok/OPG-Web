var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var infoSchema = mongoose.Schema({
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

var Info_Programming = mongoose.model('Info_Programming',infoSchema);
var Info_Exhibition = mongoose.model('Info_Exhibition',infoSchema);
var Info_IT = mongoose.model('Info_IT',infoSchema);
var Info_Job = mongoose.model('Info_Job',infoSchema);

module.exports={
	Info_Programming:Info_Programming,
	Info_Exhibition:Info_Exhibition,
	Info_IT:Info_IT,
	Info_Job:Info_Job
};