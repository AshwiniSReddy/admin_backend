const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Ensure this path matches the location of your Admin model

// GET route to fetch upcoming events
router.get('/', async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight for today's date comparison, if necessary

  try {
    const upcomingEvents = await Admin.find({
      fromDate: { $gt: today } // Select documents where fromDate is after today
    });

    res.json(upcomingEvents); // Send the filtered documents as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send an error response if something goes wrong
  }
});

module.exports = router;