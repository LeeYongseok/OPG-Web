var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs=require('fs');
var methodOverride = require('method-override');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var mongoose=require('mongoose');
/*mongoDB connect내용은 git commit을 하지 말것!! 가장 중요 합니다.*/
mongoose.connect('mongodb://(id):(password)@ds163698.mlab.com:63698/reussite')
var db=mongoose.connection;
db.once('open',function(){
	console.log('Mongo DB connected!');
});
db.on('error',function(err){
	console.log('DB ERROR : ',err);
});

var postSchema = mongoose.Schema({
	title:{type:String, required:true},
	body:{type:String, required:true},
	createdAt:{type:Date,default:Date.now},
	updatedAt:Date
});
var Post = mongoose.model('post',postSchema);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', index);
app.use('/users', users);

//you should put "'get'function" down here!!

app.get('/',index);
app.get('/main',function(req,res){
	res.render('main',{
		title: 'make_title',
		main_menu: 'main_menu'
	});
});
app.get('/posts',function(req,res){
	// Post.find({},function(err,posts){
	// 	if(err) return res.json({success:false, message:err});
	// 	res.json({success:true, data:posts});
	// }); //-> backend 개발시 분리하여 사용할 때
	Post.find({}).sort('-createdAt').exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: 'make_title',
			main_menu: 'main_menu'
		});
	});
});//index
app.get('/posts/new',function(req,res){
	res.render("post_new",{
			title: 'make_title',
			main_menu: 'main_menu'
		});
});//new
app.post('/posts',function(req,res){
	Post.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		// res.json({success:true, data:post});
		res.redirect('/posts',{
			title: 'make_title',
			main_menu: 'main_menu'
		});
	});
});//create
app.get('/posts/:id',function(req,res){
	// Post.findById(req.params.id,function(err,post){
	// 	if(err) return res.json({success:false, message:err});
	// 	res.json({success:true, data:post});
	// }); //-> backend 개발시 분리하여 사용할 때
	Post.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: 'make_title',
			main_menu: 'main_menu'
		});
	});
});//show
app.get('/posts/:id/edit',function(req,res){
	Post.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: 'make_title',
			main_menu: 'main_menu'
		});
	});
});//edit
app.put('/posts/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Post.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		// res.json({success:true, message:post._id+" updated"});
		res.redirect('/posts/'+req.params.id);
	});
});//update
app.delete('/posts/:id',function(req,res){
	Post.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		// res.json({success:true, message:post._id+" deleted"});
		res.redirect('/posts',{
			title: 'make_title',
			main_menu: 'main_menu'
		});
	});
});//destroy

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
