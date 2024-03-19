var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const experssSesstion=require("express-session")
const passport=require("passport")
const dotenv = require('dotenv');
const process = require('process');
const userModel=require("./routes/users");
const postModel=require("./routes/post")
const upload=require("./routes/multer");
const localStrategy=require("passport-local");
const { MongooseError } = require('mongoose');






var usersRouter = require('./routes/users');

var app = express();
const cors = require("cors");

app.use(cors());
dotenv.config({ path: path.join(__dirname, "./.env.example") });

// for user logedin 

app.use(experssSesstion({
  resave :false,
  saveUninitialized:false,
  secret:"hey hello"
}
));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/users', usersRouter);


//easy to user authenticate
passport.use(new localStrategy(userModel.authenticate()))
app.get('/', function(req, res) {
  res.render('index', {footer: false});
});

app.get('/login', function(req, res) {
  res.render('login', {footer: false});
});

app.get('/feed',isLoggedIn,async function(req, res) {
  const posts=await postModel.find().populate("user");
  const user= await userModel.findOne({username:req.session.passport.user});
   res.render('feed', {footer: true,posts,user});
});

app.get('/profile', isLoggedIn,async function(req, res) {
  const user= await userModel.findOne({username:req.session.passport.user}).populate("posts");
  
  res.render('profile', {footer: true,user});
});

app.get('/search',isLoggedIn, async function(req, res) {
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

app.get('/like/post/:id',isLoggedIn,async function(req, res) {
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
app.get('/edit',isLoggedIn,async function(req, res) {
  const user= await userModel.findOne({username:req.session.passport.user});
  
  res.render('edit', {footer: true,user});
});

app.get('/upload',isLoggedIn,async function(req, res) {
  const user= await userModel.findOne({username:req.session.passport.user}).populate("posts");
  
  res.render('upload', {footer: true,user});
});

//router fro the search username
app.get('/username/:username',isLoggedIn, async function(req, res) {
 const rege=new RegExp(`^${req.params.username}`,'i'); //get user input  
 const users=  await userModel.find({username:rege}); //find one by one user in database
  res.json(users); //send respons in jsoin formmat
});

app.get("/username/:id",(req,res)=>{
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

app.post("/register",function(req,res,next){
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

app.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login"
}),function(req,res){

});

app.post("/logout",function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });``
});
// to user follow
app.post("/follow",isLoggedIn,(req,res)=>{
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
app.post("/unfollow",isLoggedIn,(req,res)=>{
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

app.post("/update",upload.single('imagefile') ,async function(req,res){
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

app.post('/upload',isLoggedIn, upload.single('image'),async function(req, res) {
  
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






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT,()=>{
 console.log(`the server start in ${process.env.PORT}` );
});

module.exports = app;
