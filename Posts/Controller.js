const Post=require('./Post')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;    
const axios = require('axios');
const fs=require('fs')
const path=require('path')
const deals=require('../Deal/Deal')


const createPost=async(req,res) => {

    console.log('createPost started!123',req.file)
    
    if (
        // req.file.length > 2 &&
        req.body.title.length>2 && 
        req.body.category.length>2 && 
        req.body.titleDescription.length>2 && 
        req.body.posttext.length>0 )
    {
        // console.log(' if idet po vetke true ', req.file)
        await new Post({
            title:req.body.title,
            category:req.body.category,
            titleDescription:req.body.titleDescription,
            posttext:req.body.posttext,
            image:`/images/posts/${req.file.filename}`,
            author:req.user._id,
            defaultQuantity:req.body.quantity,
            // image:`${req.file.destination}/${req.file.filename}`,
        }).save()

        res.redirect(`/admin/${req.user._id}`)
    }else
    {
        res.redirect('/new&error=1')
    }
    console.log('req.body.film = ',req.body)


    // telegram message send

    let apiToken = "6046514684:AAFgwmQoGafcfm0MyX9GDiFmPTqU3x-rC0o";
    // let chatId = "-1001979459403t";
    let chatId = "@chillupbotadmin"
    let text = "Hello world!";
   
    axios.post(`https://api.telegram.org/bot${apiToken}/sendMessage`, {
        chat_id: chatId,
        text: "hiiiii from chillup app"
      })
        .then(response => {
          console.log('Message sent successfully');
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });


    console.log('Message to telegram send')



}


const editPost=async(req,res)=>{
    // console.log('IM in edit film req body= ',req.body)
   
    if (
       
        req.body.title.length>2 
        // req.body.category.length>2 && 
        // req.body.titleDescription.length>0 && 
        // req.body.posttext.length>0 
        )
    {
            // console.log('req.file = ',req.file)
            // console.log('req.user._id= ',req.user._id)
            // console.log('req.body=== ',req.body)
           
            

            const posts= await Post.findById(req.body.id)
            if (req.file.filename){
                if (fs.existsSync(fs.unlinkSync(path.join(__dirname+'../../public'+posts.image)))){
                    fs.unlinkSync(path.join(__dirname+'../../public'+posts.image))
                }
                posts.image=`/images/posts/${req.file.filename}`
            }
            
            // console.log('PATH= ',__dirname+'../../../public'+films.image)
         
            posts.title=req.body.title,
            posts.category=req.body.category,
            posts.titleDescription=req.body.titleDescription,
            posts.posttext=req.body.posttext,
            posts.defaultQuantity=req.body.quantity,
            posts.author=req.user._id,
            posts.save()
            res.redirect(`/admin/${req.user._id}`)
    
           
        }

    else{
        res.redirect(`/editfilm/${req.body.id}?error=1`)

    }
}



const editStatus=async(req,res)=>{  
    console.log('6487f6b1e041a6907e71256e  req.body.id=',req.body.id)
    const Deals= await deals.findById(req.body.id)
  
    if (req.body.status.length>2)
        {

            Deals.updateOne(
                { $set:
                    {
                      status:req.body.status
                     
                    }
                 }
            ).exec()
            res.redirect(`/profile/${req.user._id}`)
    
           
        }

    else{
        res.redirect(`/profile/${req.body.id}?error=1`)

    }
}



const editStatusByAdmin=async(req,res)=>{  
    console.log('6487f6b1e041a6907e71256e  req.body.id=',req.body.id)
    const Deals= await deals.findById(req.body.id)
  
    if (req.body.status.length>2)
        {

            Deals.updateOne(
                { $set:
                    {
                      status:req.body.status
                     
                    }
                 }
            ).exec()
            res.redirect(`/alldeals/`)
    
           
        }

    else{
        res.redirect(`/alldeals/${req.body.id}?error=1`)

    }
}

const deletePost=async(req,res)=>{
    console.log('DELETE FILM11111')
    const { id } = req.body;

  try {
    await Post.findByIdAndDelete(id);   
    res.redirect(`/admin/${req.user._id}`)
  } catch (error) {
    res.status(400).json({ error });
  }
}

const showMore=async(req,res)=>{
    console.log('im in showMore Func- ',req._id)
    res.redirect(`/more/${req.user._id}`)
}




module.exports={createPost,editPost,deletePost,showMore,editStatus,editStatusByAdmin}