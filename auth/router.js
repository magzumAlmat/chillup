const express=require('express')
const router= express.Router()
const passport = require('passport')
const {signUp,signIn,signOut}=require('./Controller')

const createAdmin =require('../Admin/seed')

router.post("/api/signup/",signUp)
router.post("/api/signin/",passport.authenticate('local',{failureRedirect:'/login?error=1'}),signIn)
router.get( "/api/signout/", signOut)
router.get('/api/auth/google',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile/' + req.user._id)
})

router.get('/api/auth/github',passport.authenticate('github'),(req,res)=>{
    res.redirect('/profile/' + req.user._id)
})


// router.post("/api/addpost/",addpost)
createAdmin()
module.exports = router