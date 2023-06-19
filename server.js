
const express=require('express')
const session=require('express-session')
const mongooseStore=require('connect-mongo')
const passport=require('passport')

const logger = require('morgan')
const app=express();

require('./config/db')
require('./config/passport')

app.use(logger('dev'))      
app.use(express.static(__dirname+'/public'))

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
    name:'decode-blog.session',
    secret:'keyboard cat',
    maxAge: 1000*60*60*7,
    resave:false,
    store:mongooseStore.create({
      mongoUrl:'mongodb://127.0.0.1:27017'
    })
  
  }))



app.set("view engine","ejs")

app.use(passport.initialize())
app.use(passport.session())

app.use(require('./pages/router'))
app.use(require('./auth/router'))
app.use(require('./Categories/router'))
app.use(require('./Posts/router'))

app.use(require('./Rates/router'))
app.use(require('./Deal/router'))
app.use(require('./Client/router'))


const PORT=4000


app.listen(PORT, () =>{
    console.log(`This is port11 ${PORT}`);
})