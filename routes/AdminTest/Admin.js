

const express = require('express');
const router = express.Router();
const upload = require('../../multer/multer'); // Ensure the path is correct based on your project structure
const Admin = require('../../models/AdminTest'); // Ensure the path is correct based on your project structure
const Cloudinary=require('../../Cloudinary/Cloudinary')
const moment = require('moment');
const Aws = require('aws-sdk')   
const fs = require('fs'); // Required to read files from the filesystem
const dotenv = require("dotenv")
const trigger=require('../../mongotrigger/Trigger')
dotenv.config();

const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY       // secretAccessKey is also store in .env file
})
// POST route for /admin

const uploadFields = upload.fields([
    { name: 'photoVideo', maxCount: 1 },
    { name: 'photoPortrait', maxCount: 1 }
  ]);
  
  // Helper function to upload files to S3
const s3Upload = (file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: file.originalname,
            Body: fs.createReadStream(file.path),
            ContentType: file.mimetype
        };
        s3.upload(params, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.Location);
            }
        });
    });
};
router.post('/', uploadFields, async (req, res) => {
    

    try {
        if (Array.isArray(req.body.time)) {
            req.body.time = req.body.time.find(t => t); // This finds the first non-empty string in the array
        }
        if (Array.isArray(req.body.endTime)) {
            req.body.endTime = req.body.endTime.find(t => t); // This finds the first non-empty string in the array
        }
        
        const photoVideoFile = req.files['photoVideo'] ? req.files['photoVideo'][0] : undefined;
        const photoPortraitFile = req.files['photoPortrait'] ? req.files['photoPortrait'][0] : undefined;

        const photoVideoLocation = photoVideoFile ? await s3Upload(photoVideoFile) : undefined;
        const photoPortraitLocation = photoPortraitFile ? await s3Upload(photoPortraitFile) : undefined;

        const { category, title, tagline, description, bookMyShowUrl, fromDate, toDate, time,endTime, preference } = req.body;

        // Create new Admin entry with all fields
        const newAdminEntry = new Admin({
            category,
            title,
            tagline,
            description,
            photoVideo: photoVideoLocation,
            photoPortrait: photoPortraitLocation,
            bookMyShowUrl,
            fromDate, // Ensure that the date formats are compatible with your database
            toDate, // Same note as above
            time, // Assuming you've added a time field to your model
            endTime,
            preference, // Ensure this is captured as a number in your model
        });

        await newAdminEntry.save();
<<<<<<< HEAD
        // await trigger();
=======
        await trigger();
>>>>>>> c162da0325602faaf17b0b456da2461c12b75281
         
        res.status(201).json({
            message: 'Data and files saved successfully!',
            data: newAdminEntry,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error saving data and files',
            error: error.message,
        });
    }
});

module.exports = router;
