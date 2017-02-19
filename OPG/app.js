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
var photos = require('./routes/photos');

var app = express();
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;

/*mongoDB connect내용은 git commit을 하지 말것!! 가장 중요 합니다.*/
mongoose.connect(process.env.MongoDB_reussite);
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
var postSchema_inquire = mongoose.Schema({
	title:{type:String, required:true},
	body:{type:String, required:true},
	createdAt:{type:Date,default:Date.now},
	updatedAt:Date
});
var postSchema_study = mongoose.Schema({
	title:{type:String, required:true},
	body:{type:String, required:true},
	createdAt:{type:Date,default:Date.now},
	updatedAt:Date
});
var postSchema_food = mongoose.Schema({
	title:{type:String, required:true},
	body:{type:String, required:true},
	createdAt:{type:Date,default:Date.now},
	updatedAt:Date
});

var Post = mongoose.model('post',postSchema);
var Inquire = mongoose.model('inquire',postSchema_inquire);
var Study = mongoose.model('study',postSchema_study);
var Food = mongoose.model('food',postSchema_food);
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

// 자유게시판
app.get('/post',function(req,res){
	// Post.find({},function(err,posts){
	// 	if(err) return res.json({success:false, message:err});
	// 	res.json({success:true, data:posts});
	// }); //-> backend 개발시 분리하여 사용할 때
	Post.find({}).sort('-createdAt').exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '자유게시판',
			main_menu: '자유게시판',
			path:'post'
		});
	});
});//index
app.get('/post/new',function(req,res){
	res.render("post_new",{
			title: '자유게시판',
			main_menu: '자유게시판 글 쓰기',
			path:'post'
		});
});//new
app.post('/post',function(req,res){
	Post.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		// res.json({success:true, data:post});
		res.redirect('/post');
	});
});//create
app.get('/post/:id',function(req,res){
	// Post.findById(req.params.id,function(err,post){
	// 	if(err) return res.json({success:false, message:err});
	// 	res.json({success:true, data:post});
	// }); //-> backend 개발시 분리하여 사용할 때
	Post.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '자유게시판',
			main_menu: '자유게시판',
			path:'post'
		});
	});
});//show
app.get('/post/:id/edit',function(req,res){
	Post.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '자유게시판',
			main_menu: '자유게시판 글 수정',
			path:'post'
		});
	});
});//edit
app.put('/post/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Post.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		// res.json({success:true, message:post._id+" updated"});
		res.redirect('/post/'+req.params.id);
	});
});//update
app.delete('/post/:id',function(req,res){
	Post.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		// res.json({success:true, message:post._id+" deleted"});
		res.redirect('/post');
	});
});//destroy

//자유게시판 끝

// 질의응답게시판
app.get('/inquire',function(req,res){
	Inquire.find({}).sort('-createdAt').exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '질의응답',
			main_menu: '질의응답게시판',
			path:'inquire'
		});
	});
});//index
app.get('/inquire/new',function(req,res){
	res.render("post_new",{
			title: '질의응답',
			main_menu: '질의응답게시판 글 쓰기',
			path:'inquire'
		});
});//new
app.post('/inquire',function(req,res){
	Inquire.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/inquire');
	});
});//create
app.get('/inquire/:id',function(req,res){
	Inquire.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '질의응답',
			main_menu: '질의응답게시판',
			path:'inquire'
		});
	});
});//show
app.get('/inquire/:id/edit',function(req,res){
	Inquire.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '질의응답',
			main_menu: '질의응답게시판 글 수정',
			path:'inquire'
		});
	});
});//edit
app.put('/inquire/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Inquire.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/inquire/'+req.params.id);
	});
});//update
app.delete('/inquire/:id',function(req,res){
	Inquire.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/inquire');
	});
});//destroy

//질의응답 게시판 끝

//스터디 모집 게시판
app.get('/study',function(req,res){
	Study.find({}).sort('-createdAt').exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '스터디 모집',
			main_menu: '스터디 모집 게시판',
			path:'study'
		});
	});
});//index
app.get('/study/new',function(req,res){
	res.render("post_new",{
			title: '스터디 모집',
			main_menu: '스터디 모집 글 쓰기',
			path:'study'
		});
});//new
app.post('/study',function(req,res){
	Study.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/study');
	});
});//create
app.get('/study/:id',function(req,res){
	Study.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '스터디 모집',
			main_menu: '스터디 모집 게시판',
			path:'study'
		});
	});
});//show
app.get('/study/:id/edit',function(req,res){
	Study.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '스터디 모집',
			main_menu: '스터디 모집 글 수정',
			path:'study'
		});
	});
});//edit
app.put('/study/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Study.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/study/'+req.params.id);
	});
});//update
app.delete('/study/:id',function(req,res){
	Study.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/study');
	});
});//destroy
//스터디 모집 게시판 끝


//맛집 게시판
app.get('/food',function(req,res){
	Food.find({}).sort('-createdAt').exec(function(err,posts){
		if(err) return res.json({success:false, message:err});
		res.render("post_index",{
			data:posts,
			title: '맛집 정보',
			main_menu: '맛집 정보 게시판',
			path:'food'
		});
	});
});//index
app.get('/food/new',function(req,res){
	res.render("post_new",{
			title: '맛집 정보',
			main_menu: '맛집 정보 글 쓰기',
			path:'food'
		});
});//new
app.post('/food',function(req,res){
	Food.create(req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/food');
	});
});//create
app.get('/food/:id',function(req,res){
	Food.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_view',{
			data:post,
			title: '맛집 정보',
			main_menu: '맛집 정보 게시판',
			path:'food'
		});
	});
});//show
app.get('/food/:id/edit',function(req,res){
	Food.findById(req.params.id,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.render('post_edit',{
			data:post,
			title: '맛집 정보',
			main_menu: '맛집 정보 글 수정',
			path:'food'
		});
	});
});//edit
app.put('/food/:id',function(req,res){
	req.body.post.updatedAt=Date.now();
	Food.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/food/'+req.params.id);
	});
});//update
app.delete('/food/:id',function(req,res){
	Food.findByIdAndRemove(req.params.id, function(err,post){
		if(err) return res.json({success:false, message:err});
		res.redirect('/food');
	});
});//destroy
//맛집 게시판 끝

//사진 게시판
app.use('/photo', photos);

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
