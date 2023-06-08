const express= require('express')
const router= express.Router()
const {upload}=require('./multer')
const {createPost}=require('./Controller')
const {editPost}=require('./Controller')
const {deletePost}=require('./Controller')
const {showMore}=require('./Controller')
const {isAdmin}=require('../auth/middlewareIsAdmin')
const {isAuth}=require('../auth/middlewares')
router.post('/api/addpost/',isAdmin,upload.single('image'),createPost)
router.post('/api/editpost/',isAdmin,upload.single('image'),editPost)
router.post('/api/deletepost/',isAuth,deletePost)
router.post('/api/more/',isAuth,showMore)

module.exports=router

