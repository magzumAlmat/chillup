const mongoose= require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/decodeblog').then(()=>{
    console.log('connected to Mongo database')
}).catch((e)=>{
    console.log(e,'Failed to connect to DB')
})