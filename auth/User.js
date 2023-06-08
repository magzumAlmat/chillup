const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    email:String,
    full_name:String,
    gooleId:String,
    password:String,
    isAdmin:Boolean,
})


module.exports = User = mongoose.model("Users", UserSchema);
