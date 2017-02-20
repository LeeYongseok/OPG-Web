var mongoose = require('mongoose');

var postSchema_food = mongoose.Schema({
	title:{type:String, required:true},
	body:{type:String, required:true},
	createdAt:{type:Date,default:Date.now},
	updatedAt:Date
});

var Food = mongoose.model('food',postSchema_food);

module.exports=Food;