var mongoose = require("mongoose");

var answer = new mongoose.Schema({
	question1:[],
	question2:[],
	question3:[],
	question4:[],
})

module.exports=mongoose.model("response",answer);
