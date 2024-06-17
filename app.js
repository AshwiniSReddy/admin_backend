const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const bodyParser = require('body-parser');
const upload = require('./multer/multer');
const connectDB = require('./connectDb/connect');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
const ActivityFeed = require('./models/Activity');

// Route imports
const Admin_Route = require('./routes/Admin');
const history = require('./routes/history');
const edit = require('./routes/edit');
const deletedata = require('./routes/delete');
const register = require('./routes/register');
const login = require('./routes/login');
const authRoute = require('./routes/auth');
const fetchwithId = require('./routes/fetchbyid');
const Createalert = require('./routes/createAlert');
const latestThree = require('./routes/latestThee');
const recentEvents = require('./routes/recentevents');
const getAlert = require('./routes/getAlert');
const deletealert = require('./routes/deleteAlert');
const GetContactDetails = require('./routes/Formdetails/Getcontactdetails');
const postContactDetails = require('./routes/Formdetails/InsertData');
const deleteandUpdateContactinHistory = require('./routes/Formdetails/deleteContactDetail');
const FormHistory = require('./routes/Formdetails/FormHistory');
const DeleteContactHistory = require('./routes/Formdetails/DeteleContactHistory');
const createAlertActivity = require('./routes/createAlertActivity');
const deleteAlertACtivity = require('./routes/deleteAlertActivity');
const deleteContactActivity = require('./routes/deleteContactdetailsActivity');
const deleteContactHistoryActivity = require('./routes/deleteContactHistoryActivity');

// Test routes
const Admin_test = require('./routes/AdminTest/Admin');
const recentEvents_test = require('./routes/AdminTest/recentevents');
const latestThree_test = require('./routes/AdminTest/latestThee');
const fetchwithId_test = require('./routes/AdminTest/fetchbyid');
const deletedata_test = require('./routes/AdminTest/delete');
const edit_test = require('./routes/AdminTest/edit');
const history_test = require('./routes/AdminTest/history');
const createAlert_test = require('./routes/AdminTest/CreateAlert');
const deleteAlert_test = require('./routes/AdminTest/deleteAlert');
const getAlert_test = require('./routes/AdminTest/getAlert');
const deleteContactDetails_test = require('./routes/AdminTest/deleteContactDetails');
const deleteContactHistory_test = require('./routes/AdminTest/deleteContactHistory');
const getContactDetails_test = require('./routes/AdminTest/getContactdetails');
const insertContact_test = require('./routes/AdminTest/insertContact');
const formHistory_test = require('./routes/AdminTest/formHistory');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://admindashboard.paramscience.org",
    methods: ["GET", "POST"]
  }
});

// Middleware setup
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors());

app.use(cookieSession({
  name: "session",
  keys: ["cyberwolve"],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

app.use((req, res, next) => {
  req.app.set('io', io);
  next();
});

// Define routes
app.use("/api/admin", Admin_Route);
app.use('/api/history', history);
app.use('/api/recentEvents', recentEvents);
app.use('/api/edit', edit);
app.use('/api/delete', deletedata);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/latestThree', latestThree);
app.use('/api/fetchbyid', fetchwithId);
app.use('/api/alert', Createalert);
app.use('/api/deletealert', deletealert);
app.use('/api/getAlert', getAlert);
app.use('/api/post_contactDetails', postContactDetails);
app.use('/api/get-form-submissions', GetContactDetails);
app.use('/api/deleteContact-upadate-in-history', deleteandUpdateContactinHistory);
app.use('/api/form-history', FormHistory);
app.use('/api/deleteContactHistory', DeleteContactHistory);
app.use('/api/auth', authRoute);
app.use('/api/CreateEventActivity', CreateEventActivity);
app.use('/api/deleteEventActivity', createDeleteActivity);
app.use('/api/editEventActivity', EditEventActivity);
app.use('/api/createAlertActivity', createAlertActivity);
app.use('/api/deleteAlertActivity', deleteAlertACtivity);
app.use('/api/deleteContactDetailsActivity', deleteContactActivity);
app.use('/api/deleteContactHistoryActivity', deleteContactHistoryActivity);

// Test APIs
app.use("/api/admin_test", Admin_test);
app.use('/api/history_test', history_test);
app.use('/api/recentEvents_test', recentEvents_test);
app.use('/api/edit_test', edit_test);
app.use('/api/delete_test', deletedata_test);
app.use('/api/latestThree_test', latestThree_test);
app.use('/api/fetchbyid_test', fetchwithId_test);
app.use('/api/getAlert_test', getAlert_test);
app.use('/api/createAlert_test', createAlert_test);
app.use('/api/deleteAlert_test', deleteAlert_test);
app.use('/api/deleteConatactDetails_test', deleteContactDetails_test);
app.use('/api/deleteContactHistory_test', deleteContactHistory_test);
app.use('/api/getContactdetails_test', getContactDetails_test);
app.use('/api/insertContact_test', insertContact_test);
app.use('/api/formHistory_test', formHistory_test);

// Socket.IO configuration
io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit and listen to events specific to your needs
  socket.on('send_message', (message) => {
    console.log(message);
    io.emit('receive_message', message);
  });

  socket.on('contact_updated', (contactId) => {
    socket.broadcast.emit('contact_removed', contactId);
  });

  socket.on('delete_record', (id) => {
    console.log('Record deleted with ID:', id);
    socket.broadcast.emit('record_deleted', id);
  });

  // Fetch and send all activities to the new user
  ActivityFeed.find().sort({ timestamp: -1 }).limit(10).then(activities => {
    socket.emit('init-activities', activities);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`The server is up at ${PORT}`);
});
