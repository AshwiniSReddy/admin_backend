// // adminRoutes.js
// const express = require('express');
// const router = express.Router();
// const upload = require('../multer/multer'); // Adjust the path according to your project structure
// const Admin = require('../models/Admin'); // Adjust the path according to your project structure

// // POST route for /admin
// router.post('/', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
//     try {
//         const photo = req.files['photo'] ? req.files['photo'][0].path : undefined;
//         const video = req.files['video'] ? req.files['video'][0].path : undefined;

//         const { eventUpdate, title, tagline, description } = req.body;

//         const newAdminEntry = new Admin({
//             eventUpdate,
//             media: {
//                 photo,
//                 video,
//             },
//             title,
//             tagline,
//             description,
//         });

//         await newAdminEntry.save();

//         res.status(201).json({
//             message: 'Data and files saved successfully!',
//             data: newAdminEntry,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: 'Error saving data and files',
//             error: error.message,
//         });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const upload = require('../multer/multer'); // Ensure the path is correct based on your project structure
const Admin = require('../models/Admin'); // Ensure the path is correct based on your project structure
const Cloudinary=require('../Cloudinary/Cloudinary')
const moment = require('moment');
const Aws = require('aws-sdk')   
const fs = require('fs'); // Required to read files from the filesystem
const dotenv = require("dotenv")
const trigger=require('../mongotrigger/Trigger')
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

        const { category, title, tagline, description, bookMyShowUrl, fromDate, toDate, time, preference } = req.body;

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
        await trigger();
         
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

// try {
    //     // Assuming photoVideo is the name for both photo and video uploads
    //     if (Array.isArray(req.body.time)) {
    //         req.body.time = req.body.time.find(t => t); // This finds the first non-empty string in the array
    //     }
        
    //     const photoVideo = req.file ? req.file.path : undefined;
    //     // console.log(req.body)
    //     // console.log(photoVideo)
    //     // const photoVideo = req.files['photoVideo'] ? req.files['photoVideo'][0].path : undefined;
    //     // const uploadedImage = await Cloudinary.uploader.upload(photoVideo, {
            
    //     //     folder: "posts"},
    //     //     function(error, result) {
    //     //         if (error) {
    //     //             console.log(error)
    //     //         }
    //     //         console.log(result);
    //     //         var data=result;
    //     //     }
    //     // )

    //     const params = {
    //         Bucket:process.env.S3_BUCKET_NAME,      // bucket that we made earlier
    //         Key: req.file.originalname, // Name of the image
    //         Body: fs.createReadStream(req.file.path), // Create a read stream from the file path
    //         // ACL: "public-read-write", // defining the permissions to get the public link
    //         ContentType: req.file.mimetype // Use the file's mimetype from multer
    //     };
  
        


    //     const { category,title, tagline, description, bookMyShowUrl, fromDate, toDate, time, preference } = req.body;
    //   s3.upload(params,async (error,data)=>{
    //         if(error){
    //             console.log("Error uploading file: ", error);
    //             res.status(500).send({"err":error})  // if we get any error while uploading error message will be returned.
    //         }else{
    //             // Create new Admin entry with all fields
    //     const newAdminEntry = new Admin({
    //         category,
    //         title,
    //         tagline,
    //         description,
    //         photoVideo:data.Location, // Adjusted to match the schema
    //         photoPortrait:
    //         bookMyShowUrl,
    //         fromDate, // Ensure that the date formats are compatible with your database
    //         toDate, // Same note as above
    //         time, // Assuming you've added a time field to your model
    //         preference, // Ensure this is captured as a number in your model
    //     });

    //     await newAdminEntry.save();

    //     res.status(201).json({
    //         message: 'Data and file saved successfully!',
    //         data: newAdminEntry,
    //     });
    //         }
      
        
    // })
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({
    //         message: 'Error saving data and file',
    //         error: error.message,
    //     });
    // }