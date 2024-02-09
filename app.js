const express = require("express");
const dotenv = require("dotenv")
const cors= require("cors")
const bodyParser = require('body-parser');
const upload=require('./multer/multer')
const Admin_main = require('./models/Admin'); // Import the Feedback model
const connectDB=require("./connectDb/connect");
const Admin_Route=require('./routes/Admin')
const  history=require('./routes/history')
const edit=require('./routes/edit')
const { get } = require("mongoose");

const recentEvents=require('./routes/recentevents')


const cron = require('node-cron');

const app=express();
app.use(bodyParser.json()); // for parsing application/json

const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads'); // __dirname is the directory of the current module

// Ensure the uploads directory exists
fs.mkdirSync(uploadsDir, { recursive: true });


dotenv.config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/admin",Admin_Route);
app.use('/api/history',history)
app.use('/api/recentEvents',recentEvents)
app.use('/api/edit',edit)


app.listen(process.env.PORT,async ()=>{
    await connectDB(); 
    console.log(`Ther server is up at ${process.env.PORT}`)
})



