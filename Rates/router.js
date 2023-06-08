const express=require('express')
const router= express.Router()
// const Genres=require('./Genres')

const {saveRate}=require('./Controller')

router.post('/api/rate', saveRate)


module.exports=router