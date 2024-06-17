const express = require('express');
const router = express.Router();
const Admin = require('../../models/AdminTest'); // Ensure the path is correct based on your project structure
const moment = require('moment'); // Import moment
// GET route to fetch the latest three data entries
router.get('/', async (req, res) => {
  try {
    // Fetch the latest three documents based on their creation date
    const latestData = await Admin.find({})
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order to get the newest documents first
      .limit(3); // Limit the result to the latest 3 entries

      const formattedData = latestData.map(doc => {
        // Clone the document data
        const document = doc.toObject();
  
        // Format dates using moment
        if (document.fromDate) {
          document.formattedFromDate = moment(document.fromDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ'); // ISO 8601 format
          document.displayFromDate = moment(document.fromDate).format('MMMM DD, YYYY'); // For display
        }
  
        if (document.toDate) {
          document.formattedToDate = moment(document.toDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ'); // ISO 8601 format
          document.displayToDate = moment(document.toDate).format('MMMM DD, YYYY'); // For display
        }
  
        return document;
      });
  

    res.json(formattedData); // Send the filtered and sorted documents as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send an error response if something goes wrong
  }
});

module.exports = router;
