const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const cors = require("cors")
const bodyParser = require('body-parser');
const upload = require('./multer/multer')
const Admin_main = require('./models/Admin'); // Import the Feedback model
// const Admin_test=require('./models/AdminTest')
const connectDB = require("./connectDb/connect");
const Admin_Route = require('./routes/Admin')
const http = require('http');
const socketIo = require('socket.io');

const history = require('./routes/history')
const edit = require('./routes/edit')

const deletedata = require('./routes/delete')

const register = require('./routes/register')
const login = require('./routes/login')
const passport = require('passport')
const cookieSession = require('cookie-session')
const authRoute = require("./routes/auth");
const fetchwithId = require('./routes/fetchbyid')

const passportSetup = require('./passport/passport')
const { get } = require("mongoose");
const Createalert = require('./routes/createAlert')
const latestThree = require('./routes/latestThee')

const recentEvents = require('./routes/recentevents')

const getAlert = require('./routes/getAlert');
const deletealert = require('./routes/deleteAlert')
const cron = require('node-cron');
// const FormDetails=require('./routes/Formdetails/InsertData')
const GetContactDetails = require('./routes/Formdetails/Getcontactdetails')
const postContactDetails = require('./routes/Formdetails/InsertData')
const deleteandUpdateContactinHistory = require('./routes/Formdetails/deleteContactDetail')
const FormHistory = require('./routes/Formdetails/FormHistory')
const DeleteContactHistory = require('./routes/Formdetails/DeteleContactHistory')

const createAlertActivity=require('./routes/createAlertActivity')
const deleteAlertACtivity=require('./routes/deleteAlertActivity')
const deleteContactActivity=require('./routes/deleteContactdetailsActivity')
const deleteContactHistoryActivity=require('./routes/deleteContactHistoryActivity')


//test
const Admin_test = require('./routes/AdminTest/Admin')
const recentEvents_test = require('./routes/AdminTest/recentevents')

const latestThree_test = require('./routes/AdminTest/latestThee')
const fetchwithId_test = require('./routes/AdminTest/fetchbyid')
const deletedata_test = require('./routes/AdminTest/delete')
const edit_test = require('./routes/AdminTest/edit')
const history_test = require('./routes/AdminTest/history')
const ActivityFeed=require('./models/Activity')
const CreateEventActivity=require('./routes/CreateEventActivity')
const createDeleteActivity=require('./routes/deleteEventActivity')
const EditEventActivity=require('./routes/EditEventActivity')
const createAlert_test=require('./routes/AdminTest/CreateAlert');
const deleteAlert_test=require('./routes/AdminTest/deleteAlert')
const getAlert_test=require('./routes/AdminTest/getAlert')
const deleteContactDetails_test=require('./routes/AdminTest/deleteContactDetails');
const deleteContactHistory_test=require('./routes/AdminTest/deleteContactHistory')
const getContactDetails_test=require('./routes/AdminTest/getContactdetails');
const insertContact_test=require('./routes/AdminTest/insertContact')
const formHistory_test=require('./routes/AdminTest/formHistory')



const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads'); // __dirname is the directory of the current module
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://admindashboard.paramscience.org", // Allow all origins for simplicity. Adjust as necessary.
    methods: ["GET", "POST"]
  }
});

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// Ensure the uploads directory exists
fs.mkdirSync(uploadsDir, { recursive: true });


dotenv.config();

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 1000, // Corrected to 24 hours in milliseconds

  })
);



const corsOptionsDelegate = function (req, callback) {
  let allowedOrigins = [
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


io.on('connection', (socket) => {
  console.log('A user connected');


  // You can emit and listen to events specific to your needs
  socket.on('send_message', (message) => {
    console.log(message);
    io.emit('receive_message', message);
  });
  socket.on('contact_updated', (contactId) => {
    // Broadcast to all clients except the sender
    socket.broadcast.emit('contact_removed', contactId);
  });
  socket.on('delete_record', (id) => {
    console.log('Record deleted with ID:', id);
    socket.broadcast.emit('record_deleted', id); // Broadcast to all other clients
  });

   // Fetch and send all activities to the new user
   ActivityFeed.find().sort({ timestamp: -1 }).limit(10).then(activities => {
    socket.emit('init-activities', activities);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use(cors(corsOptionsDelegate));

app.use(passport.initialize());
app.use(passport.session());
//middleware 
app.use((req, res, next) => {
  req.app.set('io', io);
  next();
});

// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/admin", Admin_Route);
app.use('/api/history', history)
app.use('/api/recentEvents', recentEvents)
app.use('/api/edit', edit)
app.use('/api/delete', deletedata)
app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/latestThree', latestThree)

app.use('/api/fetchbyid', fetchwithId)
app.use('/api/alert', Createalert)
app.use('/api/deletealert', deletealert)
app.use('/api/getAlert', getAlert)
app.use('/api/post_contactDetails', postContactDetails)
app.use('/api/get-form-submissions', GetContactDetails)
app.use('/api/deleteContact-upadate-in-history', deleteandUpdateContactinHistory)
app.use('/api/form-history', FormHistory)
app.use('/api/deleteContactHistory', DeleteContactHistory);
app.use('/api/auth', authRoute)
app.use('/api/CreateEventActivity',CreateEventActivity)
app.use('/api/deleteEventActivity',createDeleteActivity)
app.use('/api/editEventActivity',EditEventActivity)
app.use('/api/createAlertActivity',createAlertActivity)
app.use('/api/deleteAlertActivity',deleteAlertACtivity)
app.use('/api/deleteContactDetailsActivity',deleteContactActivity)
app.use('/api/deleteContactHistoryActivity',deleteContactHistoryActivity)

//test apis

app.use("/api/admin_test", Admin_test);
app.use('/api/history_test', history_test)
app.use('/api/recentEvents_test', recentEvents_test)
app.use('/api/edit_test', edit_test)
app.use('/api/delete_test', deletedata_test)
app.use('/api/latestThree_test', latestThree_test)
app.use('/api/fetchbyid_test', fetchwithId_test)
app.use('/api/getAlert_test',getAlert_test)
app.use('/api/createAlert_test',createAlert_test)
app.use('/api/deleteAlert_test',deleteAlert_test)
app.use('/api/deleteConatactDetails_test',deleteContactDetails_test)
app.use('/api/deleteContactHistory_test',deleteContactHistory_test)
app.use('/api/getContactdetails_test',getContactDetails_test)
app.use('/api/insertContact_test',insertContact_test)
app.use('/api/formHistory_test',formHistory_test)







server.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Ther server is up at ${process.env.PORT}`)
})





