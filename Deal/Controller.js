const Post=require('../Posts/Post')
const Deal=require('./Deal')

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;    

const fs=require('fs')
const path=require('path')


const createDeal=async(req,res) => {
    console.log('createDeal started!')

    
    const posts= await Post.findById(req.body._id)
    console.log('DQ=  ',posts)
    // console.log('req.file = ',req.file)
    // console.log('req.body ',req.body.category,typeof(req.body.category))

    // console.log('req.body=== ',req.body.time)
    // console.log('req.body=== ',req.body.good)

    // console.log('req user_id',req.user._id)
    
    if (
        // req.file.length > 2 &&
        req.body.nameOrganization.length>2 && 
        req.body.fioOrder.length>2 && 
        req.body.address.length>0 )
    {
        // console.log(' if idet po vetke true ', req.file)
     
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
            good:req.body.good,
            title:req.body.title,
            category:req.body.category,
            titleDescription:req.body.titleDescription,
            posttext:req.body.posttext,
            // image:`/images/posts/${req.file.filename}`,
            author:req.user._id,
            defaultQuantity:req.body.quantity,
            // image:`${req.file.destination}/${req.file.filename}`,
        }).save(),


       
        


        res.redirect(`/profile/${req.user._id}`)
    }else
    {
        res.redirect('/new&error=1')
    }
    console.log('req.body.film = ',req.body)
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