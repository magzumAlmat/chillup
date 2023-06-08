const express=require('express')
const router= express.Router()
// const Genres=require('./Genres')
const writeDataCategory=require('./Seed')
const {getAllCategories} = require('./Controller')



router.get('/api/category',getAllCategories)
writeDataCategory()

module.exports=router


