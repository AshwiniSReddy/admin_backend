const multer  = require('multer');


console.log(1111);

const storage = multer.diskStorage({

    destination: function(req, file, cb) {
      cb(null, 'uploads/'); // set the destination for file uploads
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // set the filename for file uploads
    }
  });
  
  const upload = multer({ storage: storage });

  module.exports = upload; // Export using CommonJS syntax
  //djd