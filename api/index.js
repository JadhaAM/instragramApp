const express = require('express');
const dotenv = require('dotenv');
const userModel = require('./routes/users');
const postModel = require('./routes/post'); 
const bodyParser = require('body-parser');
const path =require('path');
const crypto = require('crypto');
const cors = require('cors');
const upload=require("./routes/multer");

const app = express();

dotenv.config({ path: path.join(__dirname, './.env.example') });

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

app.use('/users', userModel);

app.get('/login', function(req, res) {
  res.render('login', {footer: false});
});

app.get('/feed',async function(req, res) {
  const posts=await postModel.find().populate("user");
  const user= await userModel.findOne({username:req.params.user});
   res.render('feed', {footer: true,posts,user});
});

app.get('/profile',  async function (req, res) {
  console.log('Session:', req.session);
  console.log('Passport:', req.session.passport);

  try {
    const user = await userModel.findOne({ username: req.params.user }).populate('posts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user from server:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});




app.get('/search', async function(req, res) {
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

app.get('/like/post/:id',async function(req, res) {
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

app.get('/check', (req, res) => {
  res.status(200).json({ message: 'Authenticated', user: req.user });
});

app.get('/upload',async function(req, res) {
  const user= await userModel.findOne({username:req.session.passport.user}).populate("posts");
  
  res.render('upload', {footer: true,user});
});

//router fro the search username
app.get('/username/:username', async function(req, res) {
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
 const {username,name, email, password, } = req.body;

  const newUser = new userModel({username,name, email, password});

  newUser.save()
    .then(() => {
      res.status(200).json({message: 'User registered succesfully!'});
    })
    .catch(error => {
      console.log('Error creating a user');
      res.status(500).json({message: 'Error registering the user'});
    });
});

app.post("/login", async (req, res) => {
  try {
    const {username, password} = req.body;

    const user = await userModel.findOne({username});
    if (!user) {
      return res.status(401).json({message: 'Invalid username'});
    }

    if (user.password !== password) {
      return res.status(401).json({message: 'Invalid password'});
    }

    const secretKey = crypto.randomBytes(32).toString('hex');

    const token = jwt.sign({userId: user._id}, secretKey);

    res.status(200).json({token});
  } catch (error) {
    console.log('error loggin in', error);
    res.status(500).json({message: 'Error loggin In'});
  }
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
  res.status(200).json({ user });
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
  res.status(200).json({ user });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
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
