var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  username:{type:String, required:true},
  title:{type:String, required:true},
  body:{type:String, required: true},
  createdAt:{type:Date, default:Date.now},
  updatedAt:{type:Date},
  originalname:{type:String},
  filename:{type:String},
  photoaddress:{type:String}
});

var PhotoMod_Activity = mongoose.model('PhotoMod_Activity',photoSchema);
var PhotoMod_Study = mongoose.model('PhotoMod_Study',photoSchema);
var PhotoMod_Seminar = mongoose.model('PhotoMod_Seminar',photoSchema);

module.exports = {
  PhotoMod_Activity :PhotoMod_Activity,
  PhotoMod_Study : PhotoMod_Study,
  PhotoMod_Seminar : PhotoMod_Seminar
};
