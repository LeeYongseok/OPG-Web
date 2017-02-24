var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); // password 암호화를 위해 사용하는 모듈

var userSchema = mongoose.Schema({
	name:{type:String, required:[true,"이름을 입력하세요"]},
  id:{type:String, require:[true,"아이디를 입력하세요"], unique: true},
  password:{type:String, require:[true,"비밀번호를 입력하세요"]},
	tel:{type:String, required:true, unique:true},
  mail:{type:String, require:[true,"이메일을 입력하세요"], unique:true},
  admin:{type:Number, default:1 }
});

userSchema.virtual("passwordConfirmation")
.get(function(){ return this._passwordConfirmation; })
.set(function(value){ this._passwordConfirmation=value; });

userSchema.virtual("originalPassword")
.get(function(){ return this._originalPassword; })
.set(function(value){ this._originalPassword=value; });

userSchema.virtual("currentPassword")
.get(function(){ return this._currentPassword; })
.set(function(value){ this._currentPassword=value; });

userSchema.virtual("newPassword")
.get(function(){ return this._newPassword; })
.set(function(value){ this._newPassword=value; });

userSchema.path("password").validate(function(v) {
 var user = this; //

 // create user //
 if(user.isNew){ // DB에 새로 생기는 모델이면 (회원 가입시 사용)
  if(!user.passwordConfirmation){
   user.invalidate("passwordConfirmation", "비밀번호확인을 입력해주세요.");
  }
  if(user.password !== user.passwordConfirmation) {
   user.invalidate("passwordConfirmation", "입력한 비밀번호와 일치하지 않습니다.");
  }
 }

 if(!user.isNew){ // DB에 있던 모델이면 (회원 정보 수정시 사용)
  if(!user.currentPassword){
   user.invalidate("currentPassword", "현재 비밀번호를 입력해주세요");
  }
  if(user.currentPassword && !bcrypt.compareSync(user.currentPassword, user.originalPassword)){
   user.invalidate("currentPassword", "현재 비밀번호가 다릅니다.");
  } //
  if(user.newPassword !== user.passwordConfirmation) {
   user.invalidate("passwordConfirmation", "새로운 비밀번호와 일치하지 않습니다.");
  }
 }
});

userSchema.pre("save", function (next){
  var user = this;
  if(!user.isModified('password')){   // DB에 기록된 값이 변경될경우 true 아니면 false
    return next();
  }else{
    user.password = bcrypt.hashSync(user.password); // password를 해쉬로 변경하여 저장
    return next();
  }
}); // 첫번째 파라미터가 일어나기 전에 먼저 실해되도록 하는 메소드(여기서는 signUp, 회원정보 수정에 해당)

userSchema.methods.authenticate = function (password) {
 var user = this;
 return bcrypt.compareSync(password, user.password);
}; // 입력받은 password와 DB에 저장된 passwordhash랑 비교해주는 함수 생성

var User = mongoose.model('user', userSchema);

module.exports=User;
