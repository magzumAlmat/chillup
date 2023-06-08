const mongoose=require('mongoose')
const Schema=mongoose.Schema
const RateSchema=new mongoose.Schema({
  
    text:String,
    postId:{type:Schema.Types.ObjectId,ref: "post"},
    authorId:{type:Schema.Types.ObjectId,ref: "Users"},
    date:{
        type:Date,
        default:Date.now()
    }
})


module.exports = mongoose.model('rate',RateSchema)