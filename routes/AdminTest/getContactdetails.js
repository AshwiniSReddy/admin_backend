const express = require('express');
const router = express.Router();
const Form = require('../../models/formTest'); // Adjust the path as necessary



// Route to get all form submissions
router.get('/', async (req, res) => {
  try {
    const io = req.app.get('io');
    const submissions = await Form.find({}); // Find all submissions
    io.emit('update_contact_details', submissions);
   
    res.json(submissions); // Send the submissions back in JSON format
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching the documents");
  }
});

module.exports = router;
