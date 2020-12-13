const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
		unique: true
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

module.export = mongoose.model("user", userSchema);