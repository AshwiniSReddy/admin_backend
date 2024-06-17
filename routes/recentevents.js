const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Ensure this path matches the location of your Admin model

// GET route to fetch upcoming events
router.get('/', async (req, res) => {
  const todayUTC = new Date();
  todayUTC.setUTCHours(0, 0, 0, 0); // Reset time to midnight in UTC

  console.log(todayUTC); // Log the UTC date for verification
  try {
     // Modify the query to fetch events that are ongoing or upcoming
     const upcomingEvents = await Admin.find({
      $or: [
        { fromDate: { $gte: todayUTC } }, // Events that start in the future
        { fromDate: { $lte: todayUTC }, toDate: { $gte: todayUTC } } // Ongoing events (events that have started but not yet ended)
      ]
     
    });

    res.json(upcomingEvents); // Send the filtered documents as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send an error response if something goes wrong
  }
});

module.exports = router;