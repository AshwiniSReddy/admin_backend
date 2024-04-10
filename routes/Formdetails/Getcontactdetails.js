const express = require('express');
const router = express.Router();
const Form = require('../../models/form'); // Adjust the path as necessary

// Route to get all form submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await Form.find({}); // Find all submissions
    res.json(submissions); // Send the submissions back in JSON format
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching the documents");
  }
});

module.exports = router;
