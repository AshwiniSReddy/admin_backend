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

const passportSetup=require('./passport/passport')
const { get } = require("mongoose");

const latestThree=require('./routes/latestThee')
const recentEvents=require('./routes/recentevents')


const cron = require('node-cron');

const app=express();
app.use(bodyParser.json()); // for parsing application/json

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


app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

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
app.use("/auth", authRoute);


app.listen(process.env.PORT,async ()=>{
    await connectDB(); 
    console.log(`Ther server is up at ${process.env.PORT}`)
})



