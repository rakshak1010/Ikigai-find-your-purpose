var express= require("express")
var router = express.Router();
var passport=require("passport");
var auth =require("../models/auth.js");
var request = require("request");
var middleware=require("../middleware")

 router.get("/register" ,function(req,res){
  res.render("register");
 })
 router.post("/register",function(req,res){
    var newuser= new auth({
      username : req.body.username,
    });

    // auth.find({username:req.body.username},(err,data)=>{
    //   console.log(data.length)
    //   if(data){
    //     res.redirect("/register");
    //   }
    // });

    auth.register(newuser,req.body.password,function(err,user){
      if(err){
        req.flash("error","User already Exists")
        res.redirect("/register")
      }else{
        passport.authenticate("local")(req,res,function(){
        req.flash("success","Welcome "+req.body.username)
        res.redirect("/")
        })
      }
    })
 })


router.get("/login",function(req,res){
    res.render("login")
})

router.post("/login",passport.authenticate("local",{
  successRedirect: "/",
  failureRedirect:"/login",
  failureFlash: true 
}),function(req,res){
  req.flash("success","Welcome ")
});


router.get("/logout",middleware.checklogin,function(req,res){
  req.logout();
  req.flash("success","Logged out!!")
  res.redirect("/login")
})
module.exports= router;