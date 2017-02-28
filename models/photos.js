var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImgPostSchema = new Schema({
  author:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
  title:{type:String, required:true},
  body:{type:String, required: true},
  createdAt:{type:Date, default:Date.now},
  updatedAt:{type:Date},
  fileOriginalname : {type:String},
  filePath : {type:String},
  images : {type : Array},
  comments:[{
    author: {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    body: {type:String, required:true},
    date: {type:Date, default:Date.now}  }]
});

var iPostMod_Activity = mongoose.model('iPostMod_Activity',ImgPostSchema);
var iPostMod_Study = mongoose.model('iPostMod_Study',ImgPostSchema);
var iPostMod_Seminar = mongoose.model('iPostMod_Seminar',ImgPostSchema);
var iPostMod_Work = mongoose.model('iPostMod_Work',ImgPostSchema);

module.exports = {
  iPostMod_Activity :iPostMod_Activity,
  iPostMod_Study : iPostMod_Study,
  iPostMod_Seminar : iPostMod_Seminar,
  iPostMod_Work : iPostMod_Work
};
