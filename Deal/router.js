const express= require('express')
const router= express.Router()
// const {upload}=require('./multer')
const {createDeal}=require('./Controller')
// const {editPost}=require('./Controller')
// const {deletePost}=require('./Controller')
// const {showMore}=require('./Controller')
// const {isAdmin}=require('../auth/middlewareIsAdmin')
const {isAuth}=require('../auth/middlewares')

router.post('/api/finishdeal/',isAuth,createDeal)
// router.post('/api/createdeal/',isAuth,createDeal)

// router.post('/api/editpost/',isAuth,upload.single('image'),editPost)
// router.post('/api/deletepost/',isAuth,deletePost)
// router.post('/api/more/',isAuth,showMore)

module.exports=router

