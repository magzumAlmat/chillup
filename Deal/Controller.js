const Post=require('../Posts/Post')
const Deal=require('./Deal')

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;    

const fs=require('fs')
const path=require('path')



// const editPost=async(req,res)=>{
//     console.log('IM in edit post in Deal controller= ')
//     if (
        
//         req.body.nameOrganization.length>2 && 
//         req.body.fioOrder.length>2 && 
//         req.body.address.length>0 )
//     {
            
//             const posts= await Post.findById(req.body.good)
//             let defQuan=Number(posts.defaultQuantity)
//             console.log('defQuan= ' ,typeof(defQuan),defQuan)
//             console.log('req body quantity= ' ,typeof(req.body.quantity),req.body.quantity)
            
//             posts.defaultQuantity=defQuan-Number(req.body.quantity),
//             posts.updateOne()
//             res.redirect(`/profile/${req.user._id}`)
    
           
//     }

//     else{
//         res.redirect(`/profile${req.body.id}?error=1`)

//     }

// }



const createDeal=async(req,res) => {
    console.log('createDeal started!')
    const posts= await Post.findById(req.body._id)
    if (
       
        req.body.nameOrganization.length>2 && 
        req.body.fioOrder.length>2 && 
        req.body.address.length>0 )
    {

        await new Deal({
            nameOrganization:req.body.nameOrganization,
            fioOrder:req.body.fioOrder,
            address:req.body.address,            
            postavkaDate:req.body.postavkaDate,
            payForm:req.body.payForm,
            consDateStart:req.body.consDateStart,
            consDateEnd :req.body.consDateEnd,
            good:req.body.good,
            quantity:req.body.quantity,
            address:req.body.address,
            title:req.body.title,
            category:req.body.category,
            titleDescription:req.body.titleDescription,
            posttext:req.body.posttext,
            author:req.user._id,
        }).save()

            const posts= await Post.findById(req.body.good)
            let defQuan=Number(posts.defaultQuantity)
            console.log('defQuan= ' ,typeof(defQuan),defQuan)
            console.log('req body quantity= ' ,typeof(req.body.quantity),req.body.quantity)
    
            posts.updateOne(
                { $set:
                    {
                      defaultQuantity:defQuan-Number(req.body.quantity)
                     
                    }
                 }
            ).exec()

        res.redirect(`/profile/${req.user._id}`)
    }else
    {
        res.redirect('/new&error=1')
    }
  
}

// const editPost=async(req,res)=>{
//     // console.log('IM in edit film req body= ',req.body)
//     if (
//         // req.file.length > 2 &&
//         req.body.title.length>2 
//         // req.body.category.length>2 && 
//         // req.body.titleDescription.length>0 && 
//         // req.body.posttext.length>0 
//         )
//     {
//             // console.log('req.file = ',req.file)
//             // console.log('req.user._id= ',req.user._id)
//             // console.log('req.body=== ',req.body)
       

//             const posts= await Post.findById(req.body.id)
//             if (req.file.filename){
//                 if (fs.existsSync(fs.unlinkSync(path.join(__dirname+'../../public'+posts.image)))){
//                     fs.unlinkSync(path.join(__dirname+'../../public'+posts.image))
//                 }
//                 posts.image=`/images/posts/${req.file.filename}`
//             }
            
//             // console.log('PATH= ',__dirname+'../../../public'+films.image)
         
//             posts.title=req.body.title,
//             posts.category=req.body.category,
//             posts.titleDescription=req.body.titleDescription,
//             posts.posttext=req.body.posttext,
//             posts.defaultQuantity=req.body.quantity,
//             posts.author=req.user._id,
//             posts.save()
//             res.redirect(`/profile/${req.user._id}`)
    
           
//         }

//     else{
//         res.redirect(`/editfilm/${req.body.id}?error=1`)

//     }
// }


// const deletePost=async(req,res)=>{
//     console.log('DELETE FILM11111')
//     const { id } = req.body;

//   try {
//     await Post.findByIdAndDelete(id);   
//     res.redirect(`/profile/${req.user._id}`)
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// }

// const showMore=async(req,res)=>{
//     console.log('im in showMore Func- ',req._id)
//     res.redirect(`/more/${req.user._id}`)
// }


module.exports={createDeal}