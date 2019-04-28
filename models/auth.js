var mongoose = require("mongoose");
var passportlocalmongoose =require("passport-local-mongoose")

var authschema=new mongoose.Schema({
	username:String,
	password:String,
	response:String,
})
authschema.plugin(passportlocalmongoose);

module.exports=mongoose.model("rak",authschema);

