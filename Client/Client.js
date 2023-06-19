
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ClientSchema=new mongoose.Schema({

    
    image:String,    //Фото магазина
    image2:String,   //Фото удв собственника магазина
    nameOrganization:String,
    shopName:String,
    shopAddress:String,
    fio:String,
    phone:String,
    manager:String,
    iin:String,
    orderNumber:String,
    // location:String,
    // address:String,
    // title:String,
    // good:{type:Schema.Types.ObjectId,ref:  "post"},
    key:Number,
    // titleDescription:String,
    
    author:{type:Schema.Types.ObjectId,ref: "Users"},
    // quantity:Number,
    
    date:{default:Date.now,type:Date},
    // postavkaDate:{type:Date},
    // nameOrganization:String,
    // fioOrder:String,
    // payForm:String,
    // consDateStart:{type:Date},
    // consDateEnd:{type:Date},
    // status:String,
})

module.exports = mongoose.model('clients',ClientSchema)