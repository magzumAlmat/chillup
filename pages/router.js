const express =require('express')
const router= express.Router()
const User=require('../auth/User')
const categories=require('../Categories/Category')
const Post=require('../Posts/Post')
// const Good=require('../Goods/Goods')
const Rate=require('../Rates/Rates')
// const Goods = require('../Goods/Goods')
const Deal=require('../Deal/Deal')

router.get('/',async(req,res) =>{
    const AllCategories=await categories.find()
    // console.log('cat= ',AllCategories)
    const Categories= await categories.findOne({key:req.query.Categories})
    const options={}



    if(Categories)
    {
        options.category=Categories._id        //category потому что название таблицы такое
        res.locals.Categories = req.query.Categories
    }

    let page=0
    const limit=3

    if(req.query.page && req.query.page>0){
        page=req.query.page
    }


    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                title: new RegExp(req.query.search, 'i')
            },
            {
                titleDescription: new RegExp(req.query.search, 'i')
            }
        ]
        res.locals.search = req.query.search
    }


    // console.log('Categories=  ',Categories,'req.query.Categories== ',req.query.Categories)

    // optionTotalFilms={}
    console.log(req.query,'Я попал в условие когда мы смотрим почты конкретного юзера')
    
    if(req.query.userposts && req.query.userposts.length > 0){
        console.log('Я попал в условие когда мы смотрим почты конкретного юзера')
    }


    if (req.query.Categories){
        options.category = Categories._id;
    }
    // console.log("@@@", optionTotalFilms)

    const totalFilms= await Post.count(options)


    console.log('page from router= ',Math.ceil(totalFilms/limit),'totalposts= ',totalFilms,'limit= ',limit)  
    
    const post= await Post.find(options).limit(limit).skip(page*limit).populate('category').populate('author')
    const user = req.user ? await User.findById(req.user._id) : {}
    // console.log('user= ', user)
    // const allUsers = await User.find(req.user.id)
    
    // console.log('post= ',post)
    res.render("index",{user,posts:post,
        category:AllCategories,
        user:req.user?req.user:{},
        pages:Math.ceil(totalFilms/limit)})
    
})



router.get('/addBlog',async (req,res) =>{
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)

    res.render("addBlog",{category:AllCategories,user:req.user?req.user:{}})
})




router.get('/admin/:id', async (req,res) =>{
    // const allGanres=await ganres.find()
    const user = await User.findById(req.params.id)
    const posts= await Post.find().populate('category').populate('author')
    res.render("adminProfile",{posts,user:req.user ? req.user:{},loginUser:req.user })
})


router.get('/addpost',async(req,res) =>{
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
    const post= await Post.find().populate('category').populate('author')
    res.render("addBlog",{posts:post,category:AllCategories,user:req.user?req.user:{}})
})


router.get('/adddeal',async (req,res) =>{
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
   
    const posts= await Post.find().populate('category').populate('author')
    res.render("addDeal",{posts,category:AllCategories,user:req.user?req.user:{}})
})


router.get('/createdeal/:id',async (req,res) =>{
    console.log('this is req.body from  create dial= ',req.body)
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
   
    const posts= await Post.findById(req.params.id).populate('category').populate('author')
    res.render("createDeal",{posts,category:AllCategories,user:req.user?req.user:{}})
})

router.get('/alldeals',async (req,res) =>{
    console.log('this is req.body from  create dial= ',req.body)
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
   
    const deal= await Deal.find().populate('author').populate('good')
    
    const posts= await Post.findById(req.params.id).populate('category').populate('author')
    res.render("allDeals",{deal,posts,category:AllCategories,user:req.user?req.user:{}})
})



router.get('/editpost/:id',async(req,res) =>{
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
    const post= await Post.findById(req.params.id)
    res.render("EditPost",{posts:post,category:AllCategories,user:req.user?req.user:{}})
})


router.get('/editstatus/:id',async(req,res) =>{
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
    const post= await Post.findById(req.params.id)
    res.render("profile",{posts:post,category:AllCategories,user:req.user?req.user:{}})
})



router.get('/more/:id',async(req,res) =>{
    console.log('req.params.id= ',req.params.id)
    const AllCategories=await categories.find()
    const rate=await Rate.find({postId:req.params.id}).populate('authorId')
    const user = await User.findById(req.params.id)
    const post= await Post.findById(req.params.id).populate('category').populate('author')
    res.render("more",{rate:rate,post:post,category:AllCategories,user:req.user?req.user:{}})
})

router.get('/userposts/:id',async(req,res) =>{
    console.log('req.params.id= ',req.params.id)
    // const AllCategories=await categories.find()
    // const rate=await Rate.find({postId:req.params.id}).populate('authorId')
    const user = await User.findById(req.params.id)
    const posts= await Post.find({author:req.params.id}).populate('author')
    console.log('iam in userposts router=   ',posts)
    res.render("userposts",{posts:posts,user:req.user?req.user:{}})
})

router.post('/deletepost/:id', async(req, res) => {
    //     console.log('DELETE APP')
    //     const id = req.params.id;
    //     Film.findByIdAndDelete(id, (err) => {
    //       if (err) {
    //         console.log(err);
    //         res.send('Error deleting book');
    //       } else {
    //         res.redirect('/admin/'+req.user.id)
    //       }
    //     });
    //   });
    const user = await User.findById(req.params.id)
    const post= await Post.findById(req.params.id)
        res.render("DeletePost",{posts:post,user:req.user ? req.user:{}})
    })

router.get('/post',(req,res) =>{
    
    res.render("post")
})

router.get('/profile/:id',async(req,res) =>{
    console.log('req params= ',req.params)
    const output=''
    const post= await Post.find().populate('category').populate('author')
    const deal= await Deal.find().populate('author').populate('good')
    
    
    // if (deal.author.id==req.params.id){
    //     filteredDeal=deal
    // }
    // console.log('reqparamsid= ',req.params.id)
    // console.log('post= ',post)
    // console.log('deal= ',deal.author.id)
    res.render("profile",{deal,posts:post,user: req.user ? req.user:{}})
})

router.get('/register',(req,res) =>{
    res.render("signUp")
})

router.get('/signin',(req,res) =>{
    res.render("signIn")
})




module.exports=router