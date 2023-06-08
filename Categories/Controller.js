const Category = require('./Category')



const getAllCategories=async(req,res)=>{
   
    const data=await Category.find()
    res.send({data})
}

module.exports={getAllCategories}