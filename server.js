const express = require("express");
const app = express();
const concat = require("concat-stream");
const { user } = require("./models/user.js");
const mongoose = require("mongoose");
const path = require("path");
const port = 3000;

const config = require('./config/key.js')// api키 라던지 깃허브에 노출 되면 안되는 값들

//  유저 회원 가입 and 로그인 기능먼저 / model 생성 

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

app.listen(port, _ => {
	console.log("express server open, port : " + port);
});