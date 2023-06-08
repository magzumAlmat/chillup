const passport= require('passport')
const User=require('../auth/User')

const bcrypt=require('bcrypt')
const localStrategy=require('passport-local')
const { serializeUser } = require('passport')
const { deserializeUser } = require('passport')
GOOGLE_CLIENT_ID='301660699750-2fdq5r9nlp6q48dv9gipts4elq4c1n12.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET='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'

GITHUB_CLIENT_ID='2f984ce7def09a7297da'
GITHUB_CLIENT_SECRET='1568795e58ba11baf6b6940e1e033f2e0d992f46'
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;



passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/auth/github"
  },

  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({ googleId: profile.id })
    const newUser = await new User({
        googleId: profile.id ,
        full_name:profile.displayName,
        email:profile.emails[0].value
    }).save()
    return cb(null, newUser);
}
));




passport.use(new localStrategy(
    {
        usernameField:'email'
    },
    function(email,password,done){
        
        User.findOne({email}).then(user=>{
            bcrypt.compare(String(password),String(user.password),function(err,result){
                if (err) {
                    return done(err)
                 }
                if (result) {
                    return done(null,user)
                }

        })

        }).catch(e=>{return done(e) })
    }
))

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/auth/google",
    scope:['openid','email','profile']
},
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({ googleId: profile.id })
    const newUser = await new User({
        googleId: profile.id ,
        full_name:profile.displayName,
        email:profile.emails[0].value
    }).save()
    return cb(null, newUser);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

passport.serializeUser(function(user,done){
    console.log('User Serialize ',user)
    done(null,user._id)
})

passport.deserializeUser(function(id, done){
   console.log('id DESerialize ',id)
   User.findById(id).then((user)=>{
    done(null, user)
   }).catch(err => {
    done(err, null)
   })
})