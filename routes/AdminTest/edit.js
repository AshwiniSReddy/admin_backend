const express = require('express');
const router = express.Router();
const upload = require('../../multer/multer'); // Ensure the path is correct based on your project structure
const Admin = require('../../models/AdminTest'); // Ensure the path is correct based on your project structure
const trigger=require('../../mongotrigger/Trigger')

router.patch('/:id', upload.single('photoVideo'), async (req, res) => {
  try {
    const adminId = req.params.id;
    console.log(adminId,"admin")
    console.log(req.params)
    const updateData = req.body;


    console.log(updateData)
    if (Array.isArray(req.body.fromDate)) {
      req.body.fromDate = req.body.fromDate[0]; // Take the first element
    }

    if (Array.isArray(req.body.toDate)) {
      req.body.toDate = req.body.toDate[0]; // Take the first element
    }

    if (Array.isArray(req.body.time)) {
      // If 'time' is an array, use only the first element
      req.body.time = req.body.time[0];
    }
    if (Array.isArray(req.body.endTime)) {
      // If 'time' is an array, use only the first element
      req.body.endTime = req.body.endTime[0];
    }


    // Find the document by ID and update it
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true }); // { new: true } to return the updated document
    console.log("About to trigger the workflow");
    await trigger();
    console.log("Workflow trigger attempt made");
    if (!updatedAdmin) {
      return res.status(404).send('The admin with the given ID was not found.');
    }
   
    res.send(updatedAdmin);
  } catch (error) {
    console.error('Error updating the admin:', error);
    res.status(500).send('Internal Server Error');
  }
});
// router.patch('/:id', async (req, res) => {
//     try {
//       const adminId = req.params.id;
//       console.log(req.params)
//       const updateData = req.body;


//       console.log(updateData)

//       // Find the document by ID and update it
//       const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true }); // { new: true } to return the updated document

//       if (!updatedAdmin) {
//         return res.status(404).send('The admin with the given ID was not found.');
//       }

//       res.send(updatedAdmin);
//     } catch (error) {
//       console.error('Error updating the admin:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });


module.exports = router;