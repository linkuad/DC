const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = new Schema({
	email: {
		type: String,
		maxLength: 50,
		unique: true
	},
	password:{
		type:String,
		minLength:7
	},
	name: {
		type: String,
		maxLength: 50
	},
	phone: {
		type: Number,
		default:01000000000
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	image:{
		type:String,
		maxLength:1000
	},
	lastconnect:{
		type: Date, 
		default: Date.now
	},
	isBan:{
		type:Boolean,
		default:0
	}
});
userSchema.pre('save', function( next ){//before function 'save' 
    let user = this
     // 비밀번호를 암호화 시킨다
     if(user.isModified('password')){//if password is change
        bcrypt.genSalt( saltRounds,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt,function(err,hash){
                //store hash in your password DB.
                if(err) return next(err);
                user.password = hash;//password 를 hash 값으로 업데이트
                next();
            })
        });
    }
    else{
        next();//isModified password 가 아닐때
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}


userSchema.methods.generateToken = function(cb) {
    var user = this;
    // console.log('user',user)
    // console.log('userSchema', userSchema)
    var token =  jwt.sign(user._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

const User = mongoose.model('User',userSchema);

module.exports = { User }