var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy; // 붙여가되는 패키지가 존재
var User = require("../models/User");

// serialize & deserialize User // 2
passport.serializeUser(function(user, done) {
 done(null, user);
}); // DB에서 발견한 user의 정보를 session에 어떻게 저장할지 정함

passport.deserializeUser(function(id, done) {
 User.findOne({_id:id}, function(err, user) {
  done(err, user);
 });
}); // session에서 어떻게 user object를 만들지 정함

// local strategy // 3
passport.use("local-login",
 new LocalStrategy({
   usernameField : "id", // 로그인 아이디 form 이름과 같아야함
   passwordField : "password",  // 로그인 password form 이름과 같아야함
   passReqToCallback : true
 },
  function(req, id, password, done) { // 로그인 시 호출 되는 함수
   User.findOne({id:id})            // 일치하는 아이디 검색
   .select({password:1})              // 해당 collection의 password를 선택해
   .exec(function(err, user) {        // 다음 함수를 실행
    if (err) return done(err);

    if (user && user.authenticate(password)){ // 3-3
      console.log('login success!');
     return done(null, user);   // 성공시 user를 done에 담가 리턴
    } else {
     req.flash("id", id );
     req.flash("errors", {login:"Incorrect ID or password"});
     console.log("아이디와 비밀번호를 입력하세요.");
     return done(null, false);  // user가 전달되지 않으면 local-strategy는 실패로 간주
    }
   });
  }
 )
);

module.exports = passport;
