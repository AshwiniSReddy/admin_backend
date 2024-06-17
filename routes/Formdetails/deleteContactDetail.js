const express = require('express');
const router = express.Router();
const Form = require('../../models/form'); // Adjust the path as necessary
const FormHistory = require('../../models/formHistory'); // Ensure path is correct

// Route to delete a form entry and archive it to history
router.delete('/:id', async (req, res) => {
  try {
    const formEntry = await Form.findById(req.params.id);
    if (!formEntry) {
      return res.status(404).send("Document not found");
    }

    // Create a new history document from the existing form entry
    const historyEntry = new FormHistory(formEntry.toObject());
    await historyEntry.save();

    // Delete the original document
    await Form.findByIdAndDelete(req.params.id);

    res.send("Document moved to history and deleted from the original collection");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
