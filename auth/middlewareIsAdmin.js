const isAdmin=(req,res,next)=>{
    // console.log('req.user',req)
    if(req.user.isAdmin){
        next()
    }
    else{
        res.status(401).send('Not ADMIN')
    }
}


module.exports={isAdmin}