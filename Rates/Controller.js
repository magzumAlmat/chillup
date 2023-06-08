const Rate=require ('./Rates')

const saveRate=async (req,res)=>{
    console.log('controller Rates')
    console.log('req.body.authorId ',req.body.authorId)
    console.log('req.body.postId ',req.body.postId)
  
    if(req.body.authorId && req.body.postId )
    await new Rate({
        text: req.body.text,
        authorId: req.body.authorId,
        postId: req.body.postId,
        date: Date.now()
    }).save()
    res.status(200).send(true)
}
module.exports={saveRate}