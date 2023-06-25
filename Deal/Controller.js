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
    // console.log('createDeal started! req.body.good ',req.body)
    console.log(req.body,'!!!!!!!')
   console.log('postavkaDate= ',req.body.postavkaDate)
    console.log('req.body.client',req.body.client)
    console.log('req.body.good',req.body.good)
    console.log('req.body.countpassObj',req.body.countpassObj)
    
    const goodObj=[]
    
    const valueArray = req.body.good.split(',');

    for (let i = 0; i < valueArray.length; i++) {
        goodObj.push(valueArray[i]);
        }
  
    const countObj=[]
    
    const valueArray2 = req.body.countpassObj.split(',');

    for (let i = 0; i < valueArray2.length; i++) {
        countObj.push(valueArray2[i]);
    }
    console.log(goodObj,typeof(goodObj))
    console.log(countObj,typeof(countObj))

    // console.log('createDeal started! req.body.client',req.body.client)
    // console.log('createDeal started! req.params ',req.params.good.titleDescription)
    // console.log('createDeal started! req.params ',req.params.client.shopName)
    // console.log('createDeal started! req ',req)
    if (
        req.body.postavkaDate.length>2 
        // req.body.quantity.length>0
        )
    {

        

        let good=goodObj.map((id,index) => (
        {
            id,
            count:countObj[index]
        }    
            
        ));
        console.log('array with 2 objects = ',good)

    // for (i in goodObj){
    //     for (j in countObj){
    //         console.log('id good',i)
    //         console.log('count good',j)
    //     }
    // }

    
 
    await new Deal({
            // location:'some location',
            // address:'some address',
            // title:'some address',
            // titleDescription:'some address',
            // quantity:34,
            // payForm:'some address'
       
       
            // client:req.body.client,
        
            postavkaDate:req.body.postavkaDate,
            payForm:req.body.payForm,
            consDateStart:req.body.consDateStart,
            consDateEnd :req.body.consDateEnd,
            
            good:good,
          
            // client:req.body.client,

            // address:req.body.address,
            // title:req.body.title,
            // category:req.body.category,
            // titleDescription:req.body.titleDescription,
            // posttext:req.body.posttext,
            
            author:req.user._id,
            status:'inProgress'
        }).save()

            // const posts= await Post.findById(req.body.good)
            // console.log('posts from createDeal=',posts)
            
            // let defQuan=Number(posts.defaultQuantity)
            // console.log('defQuan= ' ,typeof(defQuan),defQuan)
            // console.log('req body quantity= ' ,typeof(req.body.quantity),req.body.quantity)
    

            // posts.updateOne(
            //     { $set:
            //         {
            //         good:{goodObj},
            //         client:req.body.client,
            //         quantity:{countObj},
            //         defaultQuantity:defQuan-Number(req.body.quantity)
                     
            //         }
            //      }
            // ).exec()

       
        res.redirect(`/profile/${req.user._id}`)
    }else
    {
        res.status(200).end()
        // res.redirect('/new&error=1')
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