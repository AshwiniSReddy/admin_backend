const express = require('express');
const router = express.Router();
const Form = require('../../models/form'); // Adjust the path as necessary
const FormHistory = require('../../models/formHistory'); // Ensure path is correct




// Route to delete a form history entry
router.delete('/:id', async (req, res) => {
    try {
      const historyEntry = await FormHistory.findByIdAndDelete(req.params.id);
      if (!historyEntry) {
        return res.status(404).send("Document not found");
      }
  
      res.send("Document deleted from history successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    }
  });
  

  module.exports = router;