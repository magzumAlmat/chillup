const express =require('express')
const router= express.Router()
const User=require('../auth/User')
const categories=require('../Categories/Category')
const Post=require('../Posts/Post')
// const Good=require('../Goods/Goods')
const Rate=require('../Rates/Rates')
// const Goods = require('../Goods/Goods')
const Deal=require('../Deal/Deal')

const Client=require('../Client/Client')
const fs=require('fs')
const keyjson=require('../googleSheets/client_secret_301660699750-bs7edp1f9jnj4eg2derf6jees3qj6bk8.apps.googleusercontent.com.json')

const url = require('url');
const querystring = require('querystring');
const { google } = require('googleapis');

const { GoogleSpreadsheet } = require('google-spreadsheet');



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




router.get('/sync',async (req,res) =>{
    console.log('я внутри SyCC')
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
    const { GoogleSpreadsheet } = require('google-spreadsheet');

    // File handling package
  

    // spreadsheet key is the long id in the sheets URL
    const RESPONSES_SHEET_ID = '1jXpRUOXzxjHw3v2JsrixomrR8Ha3YLf6xsypHeY-dMA';

    // Create a new document
    const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

    // Credentials for the service account
    const CREDENTIALS = JSON.parse(fs.readFileSync('/Users/billionare/Documents/ChillUp/pages/client_secret_301660699750-bs7edp1f9jnj4eg2derf6jees3qj6bk8.apps.googleusercontent.com.json'));

    const getRow = async (email) => {

        // use service account creds
        await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });
    
        // load the documents info
        await doc.loadInfo();
    
        // Index of the sheet
        let sheet = doc.sheetsByIndex[0];
        
        // Get all the rows
        let rows = await sheet.getRows();
      
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            
                console.log(row._id,row.title,row.category,row.titleDescription,row.image,row.author,row.posttext,row.defaultQuantity,row.date)
            
        };
    };

    getRow('myserviceacc@chilup.iam.gserviceaccount.com');


    res.render("sync",{category:AllCategories,user:req.user?req.user:{}})
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

//-------------------------------------------------------------------------
router.get('/syncclient',async (req,res) =>{
    console.log('я внутри Sync CLIENT')

    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
    const { GoogleSpreadsheet } = require('google-spreadsheet');

    // File handling package
  

    // spreadsheet key is the long id in the sheets URL
    const RESPONSES_SHEET_ID = '17aGhMYSYPV6zff6mx4Ay6YOUFnRoTyMjhX7o9GeR9w8';

    // Create a new document
    const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

    // Credentials for the service account
    const CREDENTIALS = JSON.parse(fs.readFileSync('pages/client_secret_301660699750-bs7edp1f9jnj4eg2derf6jees3qj6bk8.apps.googleusercontent.com.json'));

    const getRow = async (email) => {

        // use service account creds
        await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });
    
        // load the documents info
        await doc.loadInfo();
    
        // Index of the sheet
        let sheet = doc.sheetsByIndex[0];
        
        // Get all the rows
        let rows = await sheet.getRows();
      
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
                console.log(row.shopName,row.nameOrganization,row.shopAddress,row.phone,row.author,row.date)
                   const data={
                      
                       shopName:row.shopName,
                       nameOrganization:row.nameOrganization,
                       shopAddress:row.shopAddress,
                       phone:row.phone,
                       author:row.author,
                       date:row.date
                   } 
                   Client.updateMany(
                    { nameOrganization:data.nameOrganization },   // The query to find existing records
                    { $set: { 
                        shopName:data.shopName,
                        nameOrganization:data.nameOrganization,
                        shopAddress:data.shopAddress,
                        phone:data.phone,
                        manager:data.author,
                        date:data.date } },    
                    { upsert: true }                   // The option to perform an upsert
                  ).exec();
                    
                }
                console.log('Record to Clients added')

    };

    getRow('myserviceacc@chilup.iam.gserviceaccount.com').then(  res.redirect(`/admin/${req.user._id}`));;


    res.render("syncclient",{category:AllCategories,user:req.user?req.user:{}})
})






router.get('/createclient',async(req,res) =>{
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
    const post= await Post.find().populate('category').populate('author')
    res.render("createClient",{posts:post,category:AllCategories,user:req.user?req.user:{}})
})


router.get('/allclients',async (req,res) =>{
    console.log('this is req.body from  create dial= ',req.body)
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
    
    const deal= await Deal.find().populate('author').populate('good')
    console.log('deal in alldeals',deal)
    const posts= await Post.findById(req.params.id).populate('category').populate('author')
    const client= await Client.find()
    res.render("allClients",{client,deal,posts,category:AllCategories,user:req.user?req.user:{}})
})
//-------------------------------------------------------------------------


//------------------------------------------------------------------------------------------


// router.get('/chooseclient',async (req,res) =>{
//     const AllCategories=await categories.find()
//     const user = await User.findById(req.params.id)
//     const client= await Client.find()
//     const posts= await Post.find().populate('category').populate('author')
//     res.render("createDeal",{client,posts,category:AllCategories,user:req.user?req.user:{}})
// })


router.get('/adddeal',async (req,res) =>{
    const client= await Client.find()
    // console.log('clients ',client)
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
    const posts= await Post.find().populate('category').populate('author')
   
    res.render("createDealStep1",{client,posts,category:AllCategories,user:req.user?req.user:{}})
   
})


router.get('/createdeal/data',async (req,res) =>{
    // console.log('id',req.params.data.id)
    // console.log('id',req.params.data.name)
    // console.log('id',req.params.data.age)
    // console.log('id',req.params.data.count)

    // const selectedRows = req.params;
    // console.log('selected rows in createDrealStep2= ',selectedRows)
    
    const parsedUrl = url.parse(req.url);
    const Rows = querystring.parse(parsedUrl.query);
    const recordsString = Rows['']; // Access the value associated with the empty key
    const selectedRows = JSON.parse(recordsString); // Parse the string as JSON
    
    console.log('1=  ',selectedRows);
    const passSelectedRows=encodeURIComponent(JSON.stringify(selectedRows))  //превращаю в стринг обьект
    // console.log('1= ',selectedRows,typeof(selectedRows))
    // console.log('selected rows in createDrealStep2= ',selectedRows)
    // console.log('parsed ROWS= ',rows)
   
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
    const client= await Client.find()
    const posts= await Post.findById(req.params.id).populate('category').populate('author')
    res.render("createDealStep2",{passSelectedRows,client,posts,category:AllCategories,user:req.user?req.user:{}})
})


router.get('/finishdeal/data?:id?:goods?',async (req,res) =>{
    


    const Rows = req.query;
    const ClientId=req.query.id;
    const ChoosedGoods=req.query.goods;
    const selectedRows = JSON.parse(ChoosedGoods); //1 Parse the string as JSON!!!!!
    
    console.log('2=  ',selectedRows);
    // const modifiedStr = ChoosedGoods.slice(1, -1);
    
    const passObj=encodeURIComponent(JSON.stringify(selectedRows))  //превращаю в стринг обьект
    
    // console.log('Client ID:', ClientId);
    // console.log('Goods:', modifiedStr,typeof(modifiedStr));

    // console.log('this is req.query from  finish dial= ',req.query)
  

    // console.log('this is req.body from  finish dial!!!!= ',goods)
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
    const client= await Client.findById(ClientId)
    
    console.log('client from router=',client,typeof(client))
    // const posts= await Post.findById(req.params.good).populate('category').populate('author')
    res.render("createDealStep3",{passObj,client,category:AllCategories,user:req.user?req.user:{}})
})




router.get('/alldeals',async (req,res) =>{
    console.log('this is req.body from  create dial= ',req.body)
    const AllCategories=await categories.find()
    const user = await User.findById(req.params.id)
   
    const deal= await Deal.find().populate('author').populate('good')
    console.log('deal in alldeals',deal)
    const posts= await Post.findById(req.params.id).populate('category').populate('author')
    res.render("allDeals",{deal,posts,category:AllCategories,user:req.user?req.user:{}})
})

//-----------------------------------------------------------------------------------------------------

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
    const deal= await Deal.find().populate('author').populate('good').populate('client')
    
    
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