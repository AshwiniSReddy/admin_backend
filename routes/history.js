const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Ensure this path matches the location of your Admin model


// GET route to fetch all completed events up to the current date
router.get('/', async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Optionally reset time to midnight for today's date comparison

  try {
    const completedEvents = await Admin.find({
      toDate: { $lt: today } // Select documents where toDate is before today
    });

    res.json(completedEvents); // Send the filtered documents as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send an error response if something goes wrong
  }
});


module.exports = router;
//sdfhjk