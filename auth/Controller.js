const User = require('./User')
const bcrypt = require('bcrypt')

const signUp = async(req, res) => {
 
  if (
    (req.body.email.length <= 0) &&
    (req.body.full_name.length <= 0) &&
    (req.body.password.length <= 0) &&
    (req.body.re_password.length <= 0)
  ) {
    res.redirect('/register?error=1')
  } else if (req.body.password !== req.body.re_password) {
    res.redirect('/register?error=2')
  } 
  const findUser = await User.findOne({ email: req.body.email }).count()
  if (findUser) {
      res.redirect('/register?error=3')
    } 

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          new User({
            email: req.body.email,
            full_name: req.body.full_name,
            password: hash
          }).save()
            res.redirect('/signin')
            // console.log('result= ',res)
          
        });
      })
    
  }


  const signIn = async(req,res)=>{
    if (req.user.isAdmin){
      res.redirect(`/admin/${req.user._id}`)
    }else{
    res.redirect(`/profile/${req.user._id}`)
    }
    // res.redirect(`/profile`)
  }
  
  const signOut = (req, res)=>{
    console.log('signout clicked ',req)
    req.logout(function(err){
      if(err){
        console.log('error==  ',err)
      }
    })
    res.redirect("/")
  }
  module.exports = { signUp,signIn, signOut }