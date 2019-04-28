var middleware ={};
//  middleware.checkcommentcreator=function(req,res,next){
//   if(req.isAuthenticated()){

//     comment.findById(req.params.comment_id,function(err,data){
//       if(err){
//         console.log(err);
//         res.redirect("back")
//       }else{
//         if(data.author.id.equals(req.user._id)){
//           next();
//         }else{
//           res.send("Bro you dont got a permiss");
//     }
//       }
//     })
//   }else{
//     res.redirect("You dont have permission!!")
//     res.redirect("back")
//   }
// }

middleware.checklogin=function(req,res,next){
  if(req.isAuthenticated()){
     next();
  }else{
  req.flash("error","Log in first!")
  res.redirect("/login");
}}


// middleware.checkpostcreator=function(req,res,next){
//   if(req.isAuthenticated()){
//     post.findById(req.params.id,function(err,data){
//       if(err){
//         res.redirect("back")
//      }else{
//        if(data.author.id.equals(req.user._id)){
//         next();
//        }else{
//         res.redirect("You dont have permission!!")
//         res.redirect("back");
//        }
//      }
//     })
//   }else{
//     req.flash("error","Login to continue!")
//     res.redirect("back")
//   }
// }



module.exports=middleware;