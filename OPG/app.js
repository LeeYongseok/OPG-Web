var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs=require('fs');
var methodOverride = require('method-override');
var multer  = require('multer');

var index = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos');
var signUp = require('./routes/signUp');
var post=require('./routes/post_board');
var inquire=require('./routes/post_inquire');
var study=require('./routes/post_study');
var food=require('./routes/post_food');

var app = express();
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;

/*mongoDB connect내용은 git commit을 하지 말것!! 가장 중요 합니다.*/
mongoose.connect(process.env.MongoDB_reussite);
//process.env.MongoDB_reussite
var db=mongoose.connection;
db.once('open',function(){
	console.log('Mongo DB connected!');
});
db.on('error',function(err){
	console.log('DB ERROR : ',err);
});


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


//you should put "'get'function" down here!!

// app.get('/',index);
// app.get('/main',function(req,res){
// 	res.render('main',{
// 		title: 'make_title',
// 		main_menu: 'main_menu'
// 	});
// });

// 메인페이지
app.use('/', index);
// 회원가입 페이지
app.use('/signUp', signUp);
app.use('/users', users);
app.use('/post',post);
app.use('/inquire',inquire);
app.use('/study',study);
app.use('/food',food);

//사진 게시판
app.use('/photo', require('./routes/photos'));

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
