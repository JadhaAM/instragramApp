var express = require('express');
var router = express.Router();
const userModel=require("./users");
const postModel=require("./post")
const passport=require("passport")
const localStrategy=require("passport-local");
const upload=require("./multer");
const { MongooseError } = require('mongoose');


//easy to user authenticate
passport.use(new localStrategy(userModel.authenticate()))
router.get('/', function(req, res) {
  res.render('index', {footer: false});
});

router.get('/login', function(req, res) {
  res.render('login', {footer: false});
});

router.get('/feed',isLoggedIn,async function(req, res) {
  const posts=await postModel.find().populate("user");
  const user= await userModel.findOne({username:req.session.passport.user});
   res.render('feed', {footer: true,posts,user});
});

router.get('/profile', isLoggedIn,async function(req, res) {
  const user= await userModel.findOne({username:req.session.passport.user}).populate("posts");
  
  res.render('profile', {footer: true,user});
});

router.get('/search',isLoggedIn, async function(req, res) {
  const user= await userModel.findOne({username:req.session.passport.user}).populate("posts");
  res.render('search', {footer: true,user});
});

//chatgpt code 
// router.post("/like/post/:id", isLoggedIn, (req, res) => {
//   const postId = req.params.id;
//   const userId = req.user._id;

//   postModel.findByIdAndUpdate(
//     postId,
//     { $push: { like: userId } },
//     { new: true }
//   ) .then((result) => {
//       // Handle the resolved value (result)
//       res.json(result);
//     })
//     .catch((error) => {
//       // Handle the rejected value (error)
//       console.log(error);
//       res.status(422).json({ error: error.message });
//     });
// });

// router.put("/unlike/post/:id",isLoggedIn,(req,res)=>{
//   postModel.findByIdAndUpdate(req.body.posts,{
//     $pull:{like:req.user._id}
//   },{
//     new:true
//   }).exec((error,result)=>{
//     if(error){
//       consol.log(error)
//       return res.status(422).json({error:error})
//     }
//     else{
//       res.json(result)
//     }
//   })
// })

router.get('/like/post/:id',isLoggedIn,async function(req, res) {
  const user= await userModel.findOne({username:req.session.passport.user});
  const post =await postModel.findOne({_id:req.params.id})

  //if like then remove if not then like
  // if(post.likes && post.likes.indexOf(user._id)===-1){
  //   post.likes.push(user._id);
  // }
  
  if (Array.isArray(post.like) && post.like.indexOf(user._id) === -1) {
    post.like.push(user._id);
}
  else{
    post.like.splice( post.likes.indexOf(user._id),1);
  }
  
  await post.save();
  res.redirect("/feed");
});
router.get('/edit',isLoggedIn,async function(req, res) {
  const user= await userModel.findOne({username:req.session.passport.user});
  
  res.render('edit', {footer: true,user});
});

router.get('/upload',isLoggedIn,async function(req, res) {
  const user= await userModel.findOne({username:req.session.passport.user}).populate("posts");
  
  res.render('upload', {footer: true,user});
});

//router fro the search username
router.get('/username/:username',isLoggedIn, async function(req, res) {
 const rege=new RegExp(`^${req.params.username}`,'i'); //get user input  
 const users=  await userModel.find({username:rege}); //find one by one user in database
  res.json(users); //send respons in jsoin formmat
});

router.get("/username/:id",(req,res)=>{
  userModel.findOne({_id:req.body.id})
  .select("-password")
  .then(user=>{
    postModel.find({posts:req.body.id})
    .populate("posts","_id")
    .exec((err,post)=>{
      if(err){
        return res.status(422).json({error:err})
      }
      res.status(200).json({user,post})
    })
  }).catch(err=>{
    return res.status(404).json({error:"user not found"})
  })
})

router.post("/register",function(req,res,next){
 console.log("am here");
  const userData=new userModel({
  username:req.body.username,
  name:req.body.name,
  email:req.body.email,
})
userModel.register(userData,req.body.password)
.then(function(){
  passport.authenticate("local")(req,res,function(){
    res.redirect("/profile");
  })
})
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login"
}),function(req,res){

});

router.post("/logout",function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });``
});
// to user follow
router.post("/follow",isLoggedIn,(req,res)=>{
 const user= userModel.findByIdAndUpdate(req.body.folloeId,{
  $push:{followers:req.user._id}
 },{
  new:true
 },(err,result)=>{
  if (err) {
   return res.status(422).json({error:err})
  }
  userModel.findByIdAndUpdate(req.user._id,{
    $push:{following:req.body.folloeId}
 },
 {new:true}
 ).then(result=>res.json(result))
 .catch(err=>{return res.status(422).json({error:err})})
})
});

// to user unfollow
router.post("/unfollow",isLoggedIn,(req,res)=>{
  const user= userModel.findByIdAndUpdate(req.body.folloeId,{
   $pull:{followers:req.user._id}
  },{
   new:true
  },(err,result)=>{
   if (err) {
    return res.status(422).json({error:err})
   }
   userModel.findByIdAndUpdate(req.user._id,{
     $pull:{following:req.body.folloeId}
  },
  {new:true}
  ).then(result=>res.json(result))
  .catch(err=>{return res.status(422).json({error:err})})
 })
 });

//update files

router.post("/update",upload.single('imagefile') ,async function(req,res){
 // user updated
 const user= await userModel.findOneAndUpdate(
  {username:req.session.passport.user},
  {username:req.body.username,name:req.body.name,bio:req.body.bio},
  {new:true}
  );

  if(req.file){

    user.profileImage=req.file.filename;
  }
  await user.save();
  res.redirect("/profile");
});

router.post('/upload',isLoggedIn, upload.single('image'),async function(req, res) {
  
  const user= await userModel.findOne({username:req.session.passport.user});
  const post= await postModel.create({
    picture:req.file.filename,
    user:user._id,
    caption:req.body.caption
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/feed");
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
};

module.exports = router;
