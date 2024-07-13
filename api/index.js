const express = require('express');
const dotenv = require('dotenv');
const userModel = require('./models/users');
const postModel = require('./models/post'); 
const bodyParser = require('body-parser');
const path =require('path');
const crypto = require('crypto');
const cors = require('cors');
const upload=require("./models/multer"); 
const Secret = require('./models/Secret');
const authenticateToken =require("./models/authenticateToken");

const app = express();

dotenv.config({ path: path.join(__dirname, './.env.example') });

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

app.use('/users', userModel);


app.get('/feed',async function(req, res) {
  const posts=await postModel.find().populate("user");
  const user= await userModel.findOne({username:req.params.user});
  
});

app.get('/profile', authenticateToken, async (req, res) => {
  console.log('Inside /profile endpoint');
  try {
    const userId = req.user.userId;
    console.log('User ID from token:', userId);

    const user = await userModel.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User found:', user);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user from server:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});




app.get('/search', async function(req, res) {
  
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



app.get('/like/post/:id',async function(req, res) {
  const user= await userModel.findOne({username:req.session.passport.user});
  const post =await postModel.findOne({_id:req.params.id})
  
  if (Array.isArray(post.like) && post.like.indexOf(user._id) === -1) {
    post.like.push(user._id);
}
  else{
    post.like.splice( post.likes.indexOf(user._id),1);
  }
  
  await post.save();
  
});



app.get('/username/:username', async function(req, res) {
  try {
    const usernameParam = req.params.username;
    
    if (!usernameParam || typeof usernameParam !== 'string') {
      return res.status(400).json({ error: 'Invalid username parameter' });
    }

   
    const rege = new RegExp(`^${usernameParam}.*`, 'i');
    
    
    const users = await userModel.find({ username: rege });

    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

app.post("/register" ,async function(req,res,next){
 console.log("am here");
 try{   
 const {username,name, email, password } = req.body;

 const newUser = new userModel({ username, name, email, password });
 await newUser.save();
 console.log("User registered successfully");
 res.status(200).json({ message: 'User registered successfully!' });
} catch (error) {
  console.error('Error creating a user:', error); 
  res.status(500).json({ message: 'Error registering the user' });
}
});


app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    var secretKey = crypto.randomBytes(32).toString('hex');

    
    await Secret.create({ userId: user._id, secret: secretKey });

    const token = jwt.sign({ userId: user._id }, secretKey);
    console.log("token:", token);
    res.status(200).json({ token });
  } catch (error) {
    console.log('error logging in', error);
    res.status(500).json({ message: 'Error logging In' });
  }
});

// to user follow
app.post("/follow",(req,res)=>{
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
app.post("/unfollow",(req,res)=>{
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

app.post("/update", upload.single('media'), async function (req, res) {
  try {
    const { username, name, bio } = req.body;
    const user = await userModel.findOneAndUpdate(
      { username: req.body.currentUsername }, // Adjust this line to identify the user correctly
      { username, name, bio },
      { new: true }
    );

    if (req.file) {
      user.profileImage = req.file.filename;
    }
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/upload',authenticateToken, upload.single('media'), async function(req, res) {
  try {
    const user = await userModel.findOne({ username: req.body.user });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const post = await postModel.create({
      picture: req.file.filename,
      user: user._id,
      caption: req.body.caption
    });

    user.posts.push(post._id);
    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'An error occurred while creating the post mseg from server',error });
  }
});

app.listen(process.env.PORT,()=>{
 console.log(`the server start in ${process.env.PORT}` );
});


const http = require('http').createServer(app);

const io = require('socket.io')(http);

//{"userId" : "socket ID"}

const userSocketMap = {};

io.on('connection', socket => {
  console.log('a user is connected', socket.id);

  const userId = socket.handshake.query.userId;

  console.log('userid', userId);

  if (userId !== 'undefined') {
    userSocketMap[userId] = socket.id;
  }

  console.log('user socket data', userSocketMap);

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete userSocketMap[userId];
  });

  socket.on('sendMessage', ({senderId, receiverId, message}) => {
    const receiverSocketId = userSocketMap[receiverId];

    console.log('receiver Id', receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', {
        senderId,
        message,
      });
    }
  });
});

http.listen(3000, () => {
  console.log('Socket.IO running on port 3000');
});

app.post('/sendMessage', async (req, res) => {
  try {
    const {senderId, receiverId, message} = req.body;

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId) {
      console.log('emitting recieveMessage event to the reciver', receiverId);
      io.to(receiverSocketId).emit('newMessage', newMessage);
    } else {
      console.log('Receiver socket ID not found');
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('ERROR', error);
  }
});

app.get('/messages', async (req, res) => {
  try {
    const {senderId, receiverId} = req.query;

    const messages = await Message.find({
      $or: [
        {senderId: senderId, receiverId: receiverId},
        {senderId: receiverId, receiverId: senderId},
      ],
    }).populate('senderId', '_id name');

    res.status(200).json(messages);
  } catch (error) {
    console.log('Error', error);
  }
});

module.exports = app;
