const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const cors= require("cors")
const bodyParser = require('body-parser');
const upload=require('./multer/multer')
const Admin_main = require('./models/Admin'); // Import the Feedback model
const connectDB=require("./connectDb/connect");
const Admin_Route=require('./routes/Admin')
const  history=require('./routes/history')
const edit=require('./routes/edit')
const deletedata=require('./routes/delete')
const register=require('./routes/register')
const login=require('./routes/login')
const passport=require('passport')
const cookieSession=require('cookie-session')
const authRoute = require("./routes/auth");
const fetchwithId=require('./routes/fetchbyid')
const passportSetup=require('./passport/passport')
const { get } = require("mongoose");
const Createalert=require('./routes/createAlert')
const latestThree=require('./routes/latestThee')
const recentEvents=require('./routes/recentevents')
const getAlert=require('./routes/getAlert');
const deletealert=require('./routes/deleteAlert')
const cron = require('node-cron');

const app=express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads'); // __dirname is the directory of the current module


app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// Ensure the uploads directory exists
fs.mkdirSync(uploadsDir, { recursive: true });


dotenv.config();

app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 1000 // Corrected to 24 hours in milliseconds
    })
);
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    let allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:3000','https://paramscience.org','https://admindashboard.paramscience.org','http://dashboardadmin.s3-website.ap-south-1.amazonaws.com']; // You can add more origins as needed
    
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true, methods: "GET,POST,PUT,DELETE", credentials: true }; // Reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // Disable CORS for this request
    }
    callback(null, corsOptions); // Callback expects two parameters: error and options
  };
  
  app.use(cors(corsOptionsDelegate));

 

// app.use(
// 	cors({
// 		// origin: "http://dashboardadmin.s3-website.ap-south-1.amazonaws.com",
//         origin:`${process.env.CLIENT_URL}`,
// 		methods: "GET,POST,PUT,DELETE",
// 		credentials: true,
// 	})
// );

app.use(passport.initialize());
app.use(passport.session());

// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/admin",Admin_Route);
app.use('/api/history',history)
app.use('/api/recentEvents',recentEvents)
app.use('/api/edit',edit)
app.use('/api/delete',deletedata)
app.use('/api/register',register)
app.use('/api/login',login)
app.use('/api/latestThree',latestThree)
// app.use("/api/auth", authRoute);
app.use('/api/fetchbyid',fetchwithId)
app.use('/api/alert',Createalert)
app.use('/api/deletealert',deletealert)
app.use('/api/getAlert',getAlert)


app.listen(process.env.PORT,async ()=>{
    await connectDB(); 
    console.log(`Ther server is up at ${process.env.PORT}`)
})

//gshjkl;
//dejdke

