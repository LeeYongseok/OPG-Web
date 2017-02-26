var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
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


var PhotoMod_Activity = mongoose.model('PhotoMod_Activity',photoSchema);
var PhotoMod_Study = mongoose.model('PhotoMod_Study',photoSchema);
var PhotoMod_Seminar = mongoose.model('PhotoMod_Seminar',photoSchema);
var PhotoMod_Work = mongoose.model('PhotoMod_Work',photoSchema);

module.exports = {
  PhotoMod_Activity :PhotoMod_Activity,
  PhotoMod_Study : PhotoMod_Study,
  PhotoMod_Seminar : PhotoMod_Seminar,
  PhotoMod_Work : PhotoMod_Work
};
