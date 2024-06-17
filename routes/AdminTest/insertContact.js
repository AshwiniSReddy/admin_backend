const express = require('express');
const router = express.Router();
const Form = require('../../models/formTest'); // Adjust the path as necessary

// Route to insert form submissions
router.post('/', async (req, res) => {
  // Check if the body contains an array of submissions
  if (!Array.isArray(req.body)) {
    return res.status(400).send("Expected an array of form submissions");
  }

  // You could add additional validation here to ensure
  // each object in the array contains the required fields
  // such as name, email, phoneNumber, and message
  
  try {
    // Inserting the data into the database
    await Form.insertMany(req.body);
    res.send("Multiple documents inserted to Collection");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while inserting the documents");
  }
});

module.exports = router;