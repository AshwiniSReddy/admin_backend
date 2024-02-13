// const mongoose = require('mongoose');

// const AdminSchema=new mongoose.Schema({
//     eventUpdate:String,
//     media:{
//         photo:String,
//         vedio:String,
//     },
//     title:String,
//     tagline:String,
//     description:String

// })

// const Admin = mongoose.model('Admin', AdminSchema);

// module.exports = Admin;

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    category:String,
    fromDate: Date, // Use Date type for dates
    toDate: Date,
    title: String,
    time: String,
    tagline: String,
    description: String,
    // Assuming photoVideo is a URL to a photo or video, hence String type
    photoVideo: String,
    // URL for booking or more details, also a String
    bookMyShowUrl: String,
    // Adding fromDate, toDate, and preference to match the frontend fields
   
    // If time is important, add it as well, assuming it's a string representing the time
  
    preference: Number, // Assuming preference is a numerical value
    // Consider adding any other fields here as needed
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
