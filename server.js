const express = require("express");
const app = express();
const concat = require("concat-stream");
const mongoose = require("mongoose");
const path = require("path");
const port = 3000;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const moment = require("moment");

const config = require('./config/key.js')// api키 라던지 깃허브에 노출 되면 안되는 값들

//  유저 회원 가입 and 로그인 기능먼저 / model 생성 

app.use(express.static("client"));
app.use(express.json());//기존 bodyparser 의 기능
app.use(express.urlencoded({ extended: true }));


mongoose.connect(config.mongoURI, {//connect to MongoDB
	useUnifiedTopology : true,
	useNewUrlParser : true,
	useCreateIndex : true,
})
.then (() => console.log ( 'DB Connected!'))
.catch (err => {
	console.log (`DB Connection Error: ${err.message}`);
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.use('/api/users', require('./routes/users'));

app.listen(port, _ => {
	console.log("express server open, port : " + port);
});