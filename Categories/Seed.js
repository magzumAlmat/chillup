const Category = require("./Category")


const data=[
    '4000',
    '3000',
    '1500',
]



 async function writeDataCategory(){
    const length= await Category.count()
    if (length==0){
        data.map((item,index)=>{
            new Category({
                name:item,
                key:index
            }).save()
        })
    }
}
module.exports = writeDataCategory