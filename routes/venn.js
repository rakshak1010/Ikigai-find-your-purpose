var express= require("express")
var router = express.Router();
var passport=require("passport");
var auth =require("../models/auth.js");
var answers =require("../models/answer.js");
var request = require("request");
var middleware=require("../middleware")

router.get("/",middleware.checklogin,(req,res,next)=>{
    res.render("venn")
})

router.get("/ans",middleware.checklogin,(req,res,next)=>{
    console.log("request accepted")
    auth.find({username:req.user.username},(err,data)=>{
        answers.find({_id:data[0].response},(err,dat)=>{
            res.send(dat);
        })
    })
})

router.post("/ansother",middleware.checklogin,(req,res,next)=>{
    console.log("request accepted")
    console.log(req.body)
    auth.find({_id:req.body.id},(err,data)=>{
        answers.find({_id:data[0].response},(err,dat)=>{
            res.send(dat);
        })
    })
})


router.get("/ansother",middleware.checklogin ,(req,res,next)=>{
    auth.find((err,data)=>{
        res.send(data)
    })
})

router.get("/other",middleware.checklogin ,(req,res,next)=>{
    res.render("alluser");
})

router.post("/answer",middleware.checklogin ,function(req,res){
    console.log(req.body)
    
    var ques1 = req.body.ques1.split(",");
    var ques2 = req.body.ques2.split(",");
    var ques3 = req.body.ques3.split(",");
    var ques4 = req.body.ques4.split(",");
    console.log(ques1);
    var ans = new answers({
        question1:ques1,
        question2:ques2,
        question3:ques3,
        question4:ques4,
    })
    answers.deleteOne({_id:req.user.response}).then((err,data)=>{
        if (err) throw err;
        console.log("Update in progress")
    })
    answers.insertMany(ans).then(()=>{
        console.log(ans);
        auth.findOneAndUpdate({username:req.user.username},{ "response": ans._id},(err,data)=>{
            if (err) throw err;
        })
        req.flash("success","Posted Successfully!\nFill again to edit your responses");
        res.redirect("/")
    });
});

module.exports= router;