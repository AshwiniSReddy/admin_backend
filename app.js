const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const cors= require("cors")
const bodyParser = require('body-parser');
const upload=require('./multer/multer')
const Admin_main = require('./models/Admin'); // Import the Feedback model
// const Admin_test=require('./models/AdminTest')
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
// const FormDetails=require('./routes/Formdetails/InsertData')
const GetContactDetails=require('./routes/Formdetails/Getcontactdetails')
const postContactDetails=require('./routes/Formdetails/InsertData')

//test
const Admin_test=require('./routes/AdminTest/Admin')
const recentEvents_test=require('./routes/AdminTest/recentevents')
const latestThree_test=require('./routes/AdminTest/latestThee')
const fetchwithId_test=require('./routes/AdminTest/fetchbyid')
const deletedata_test=require('./routes/AdminTest/delete')
const edit_test=require('./routes/AdminTest/edit')
const history_test=require('./routes/AdminTest/history')

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



const corsOptionsDelegate = function (req, callback) {
  let allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:3000',
    'https://paramscience.org',
    'https://admindashboard.paramscience.org',
    'http://ec2-13-233-173-240.ap-south-1.compute.amazonaws.com',
    'http://dashboardadmin.s3-website.ap-south-1.amazonaws.com',
    'https://www.paramscience.org',
    'https://admin.dashboard.paramscience.org'
  ]; // Your list of allowed origins
  
  let origin = req.header('Origin');
  if (allowedOrigins.includes(origin)) {
    // If the origin is in the allowed list, enable CORS for that request
    corsOptions = {
      origin: true, // Reflects the request's origin, as it's allowed
      methods: "GET,POST,PUT,PATCH,DELETE",
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    };
  } else {
    // Optionally, you could choose to disable CORS for requests not coming from an allowed origin
    // by setting origin to false. This would block any requests not coming from your specified origins.
    corsOptions = { origin: false }; // Uncomment this line to enforce the restriction
  }
  callback(null, corsOptions); // Callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

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

app.use('/api/fetchbyid',fetchwithId)
app.use('/api/alert',Createalert)
app.use('/api/deletealert',deletealert)
app.use('/api/getAlert',getAlert)
app.use('/api/post_contactDetails',postContactDetails)
app.use('/api/get-form-submissions',GetContactDetails)

//test

app.use("/api/admin_test",Admin_test);
app.use('/api/history_test',history_test)
app.use('/api/recentEvents_test',recentEvents_test)
app.use('/api/edit_test',edit_test)
app.use('/api/delete_test',deletedata_test)

app.use('/api/latestThree_test',latestThree_test)



app.use('/api/fetchbyid_test',fetchwithId_test)





app.listen(process.env.PORT,async ()=>{
    await connectDB(); 
    console.log(`Ther server is up at ${process.env.PORT}`)
})


