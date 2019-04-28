var express = require("express");
var app = express();
var bodyparser= require("body-parser");
var request =require('request');
var flash=require("connect-flash");

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine" ,"ejs");
app.use(flash());
app.use(express.static("public"));


var mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/rak", { useNewUrlParser: true });
mongoose.connection.on('error',function(error){
  console.error("Error Occured in DB",error);
});
mongoose.connection.once("open",function(){
  console.log("connected DB");
});


var auth=require("./models/auth.js")
var passport=require("passport")
var localstrategy=require("passport-local")
var authroutes= require("./routes/auth.js")
var venn= require("./routes/venn.js")

app.use(require("express-session")({//use to encode and decode the session data
  secret:"i am the iron man",
  resave : false,
  saveUninitialized:false
}))

app.use(function(req,res,next){
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(auth.authenticate()));
passport.serializeUser(auth.serializeUser());    // use to serialixe the data of the user
passport.deserializeUser(auth.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentuser = req.user;
  next();
})

app.use(authroutes);
app.use(venn);

app.listen(process.env.PORT||5000,function(){
  console.log("Server Startted");
});
