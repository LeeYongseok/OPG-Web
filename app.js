var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs=require('fs');
var methodOverride = require('method-override');
var multer  = require('multer');
var flash = require('connect-flash');
var session = require('express-session');

var passport = require('./config/passport');  // 설치한 npm의 모듈이 아닌 내가 만든것으로 가져옴

var index = require('./routes/index');
var member = require('./routes/member');
var user = require('./routes/users');
var photos = require('./routes/photos');
var signUp = require('./routes/signUp');
var about = require('./routes/about');
var posts = require('./routes/posts');
var info = require('./routes/info');
var notice = require('./routes/notice');
var new_post = require('./routes/new_post');

var app = express();
var mongoose=require('mongoose');


mongoose.Promise = global.Promise;

/*mongoDB connect내용은 git commit을 하지 말것!! 가장 중요 합니다.*/
mongoose.connect(process.env.MongoDB);
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
app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit:'5mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
				secret:"MySecret",
				resave: false,
				saveUninitialized: true
			}));
app.use(passport.initialize()); // passport 초기화
app.use(passport.session());		// passport와 session을 연결

app.use(function(req, res, next){
	res.locals.isAuthenticated = req.isAuthenticated();	//passport 제공함수(로그인 여부 확인[true/false])
	res.locals.currentUser= req.user;	// 로그인 시 유저의 정보를 가져옴
	next(); // 다음으로 진행을 위해 설정
}); // custom middleware 설정, res.locals의 변수는 ejs에 사용가능



// 메인페이지
app.use('/', index);
// 회원가입 페이지
app.use('/signUp', signUp);
//마이페이지, 로그인, 로그아웃
app.use('/user', user);
//멤버 페이지
app.use('/member', member);

//글 게시판
app.use('/post',posts);

//사진 게시판
app.use('/photo', photos);

//소개
app.use('/about', about);
app.use('/info', info);

//공지사항
app.use('/notice',notice);
app.use('/new_post',new_post);

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
