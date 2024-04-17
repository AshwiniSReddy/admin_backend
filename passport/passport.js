const GoogleStratergy=require('passport-google-oauth20').Strategy
const passport=require('passport')
const dotenv = require("dotenv")


passport.use(
    new GoogleStratergy(
        {
            clientID:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            callbackURL:"https://admindashboard.paramscience.org/api/auth/google/callback",
            scope:["profile","email"],



        },
        function(accessToken,refreshToken,profile,callback){
          console.log(callback,profile)
            callback(null,profile)
        }
    )
)





// passport.use(new GoogleStratergy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "/api/auth/google/callback",
//     scope: ["profile", "email"],
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // Assuming the user's email address is in the first element of the emails array
//     const userEmail = profile.emails[0].value;
//     const username=userEmail.split('@')[0]
//     const userDomain = userEmail.split('@')[1]; // Split the email address to get the domain part

//     if (userDomain === "paraminnovation.org" && (username==="ashwinireddy" || username==="shivam" || username==="umangjgala" || username==="narendra" || username==="varun")) {
//       // If the user is from the allowed domain, proceed with the login process
//       done(null, profile);
//     } else {
//       // If the user is not from the allowed domain, return an error
//       done(null, false, { message: "Access restricted to users from paraminnovation.org" });
//     }
//   }
// ));



passport.serializeUser((user,done)=>{
    done(null,user)
});

passport.deserializeUser((user,done)=>{
    done(null,user)
})


