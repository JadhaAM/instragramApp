const mongoose=require("mongoose");
const plm=require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/instagramData");
console.log("the database connection succesfully done");

const userSchema=mongoose.Schema({
  username:String,
  name:String,
  email:String,
  password:String,
  profileImage:String,
  bio:String,
  posts:[{type:mongoose.Schema.Types.ObjectId,ref:"post"}],
  followers:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
  following:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
})
//this create serilized and deserialized users
userSchema.plugin(plm);
const User = mongoose.model("user",userSchema);

module.exports = User;