// // adminRoutes.js
// const express = require('express');
// const router = express.Router();
// const upload = require('../multer/multer'); // Adjust the path according to your project structure
// const Admin = require('../models/Admin'); // Adjust the path according to your project structure
// const moment = require('moment');
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
// const Cloudinary=require('../Cloudinary/Cloudinary')
const moment = require('moment');

// POST route for /admin
router.post('/', upload.single('photoVideo'), async (req, res) => {
    try {
        // Assuming photoVideo is the name for both photo and video uploads
        if (Array.isArray(req.body.time)) {
            req.body.time = req.body.time.find(t => t); // This finds the first non-empty string in the array
        }
        
        const photoVideo = req.file ? req.file.path : undefined;
        console.log(req.body)
        console.log(photoVideo)
        // const photoVideo = req.files['photoVideo'] ? req.files['photoVideo'][0].path : undefined;
        // const uploadedImage = await Cloudinary.uploader.upload(photoVideo, {
            
        //     folder: "posts"},
        //     function(error, result) {
        //         if (error) {
        //             console.log(error)
        //         }
        //         console.log(result);
        //         var data=result;
        //     }
        // )

        const { category,title, tagline, description, bookMyShowUrl, fromDate, toDate, time, preference } = req.body;

        // Create new Admin entry with all fields
        const newAdminEntry = new Admin({
            category,
            title,
            tagline,
            description,
            photoVideo:photoVideo, // Adjusted to match the schema
            bookMyShowUrl,
            fromDate, // Ensure that the date formats are compatible with your database
            toDate, // Same note as above
            time, // Assuming you've added a time field to your model
            preference, // Ensure this is captured as a number in your model
        });

        await newAdminEntry.save();

        res.status(201).json({
            message: 'Data and file saved successfully!',
            data: newAdminEntry,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error saving data and file',
            error: error.message,
        });
    }
});

module.exports = router;

