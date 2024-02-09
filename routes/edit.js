const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Ensure this path matches the location of your Admin model



router.patch('/:id', async (req, res) => {
    try {
      const adminId = req.params.id;
      console.log(req.params)
      const updateData = req.body;


      console.log(updateData)
  
      // Find the document by ID and update it
      const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true }); // { new: true } to return the updated document
      
      if (!updatedAdmin) {
        return res.status(404).send('The admin with the given ID was not found.');
      }
  
      res.send(updatedAdmin);
    } catch (error) {
      console.error('Error updating the admin:', error);
      res.status(500).send('Internal Server Error');
    }
  });


  module.exports = router;