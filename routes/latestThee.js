const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Ensure this path matches the location of your Admin model

// GET route to fetch the latest three data entries
router.get('/', async (req, res) => {
  try {
    // Fetch the latest three documents based on their creation date
    const latestData = await Admin.find({})
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order to get the newest documents first
      .limit(3); // Limit the result to the latest 3 entries

    res.json(latestData); // Send the filtered and sorted documents as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send an error response if something goes wrong
  }
});

module.exports = router;
