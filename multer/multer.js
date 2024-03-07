// const multer  = require('multer');


// console.log(1111);

// const storage = multer.diskStorage({

//     destination: function(req, file, cb) {
//       cb(null, 'uploads/'); // set the destination for file uploads
//     },
//     filename: function(req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname); // set the filename for file uploads
//     }
//   });
  
//   const upload = multer({ storage: storage });

//   module.exports = upload; // Export using CommonJS syntax
  
// uploadConfig.js
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require("dotenv")
dotenv.config();

// Configure AWS with your access and secret key.
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read', // this makes the uploaded files public
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            const extension = file.mimetype.split('/')[1];
            cb(null, `uploads/${Date.now().toString()}.${extension}`);
        },
    }),
});

module.exports = upload;
