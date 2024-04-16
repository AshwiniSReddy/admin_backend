const express = require('express');
const router = express.Router();
const FormHistory = require('../../models/formHistory'); // Ensure the path to your model is correct


// Route to get contact history
router.get('/', async (req, res) => {
    try {
      const history = await FormHistory.find({}); // You can add query params to filter these results
      res.json(history);
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while fetching the contact history");
    }
  });

  
 module.exports = router;
