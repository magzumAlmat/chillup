
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const DealSchema=new mongoose.Schema({
    location:String,
    address:String,
    title:String,
    good:{type:Schema.Types.ObjectId,ref:  "post"},
    
    key:Number,
    titleDescription:String,
    image:String,
    author:{type:Schema.Types.ObjectId,ref: "Users"},
    quantity:Number,
    

    date:{default:Date.now,type:Date},
    postavkaDate:{type:Date},
    nameOrganization:String,
    fioOrder:String,
    payForm:String,
    consDateStart:{type:Date},
    consDateEnd:{type:Date},
    status:String,
    client:{type:Schema.Types.ObjectId,ref: "clients"}
})

module.exports = mongoose.model('deals',DealSchema)