const express = require("express");
const app = express();
const concat = require("concat-stream");
const { User } = require("./models/User.js");
const mongoose = require("mongoose");
const path = require("path");
const port = 3000;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const moment = require("moment")

const config = require('./config/key.js')// api키 라던지 깃허브에 노출 되면 안되는 값들

//  유저 회원 가입 and 로그인 기능먼저 / model 생성 

//app.use('/api/users', require('./routes/users'));
app.use(express.static("client"));
app.use(express.json());//기존 bodyparser 의 기능


mongoose.connect(config.mongoURI, {//connect to MongoDB
	useUnifiedTopology : true,
	useNewUrlParser : true,
})
.then (() => console.log ( 'DB Connected!'))
.catch (err => {
	console.log (`DB Connection Error: ${err.message}`);
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.post('/users/register',(req,res) => {// register function
	const user = new User(req.body)
	user.save((err,doc) => {
		
		if(err) res.json({success:false,err})
		return res.status(200).json({success:true,doc})//save실패하면 에러를 퉤 성공하면 정보를 퉤
	})
})

app.post('/users/login',(req,res)=>{// login function 
	User.findOne({email:req.body.email},(err,user)=>{
		if(!user) return res.json({
			loginSuccess:false,
			message:'로그인에 실패했습니다. 이메일을 찾을 수 없습니다.'
		})
		user.comparePassword(req.body.password,(err,isMatch)=>{
			if(!isMatch) return res.json({ loginSuccess: false, message: "Wrong password" })
			
			user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
					.cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

app.listen(port, _ => {
	console.log("express server open, port : " + port);
});