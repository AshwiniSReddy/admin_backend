// adminRoutes.js
const express = require('express');
const router = express.Router();
const Alert= require('../../models/AlertTest'); // Adjust the path according to your project structure

// POST route for /admin
// Example using Express and Mongoose
// POST route for /admin to update or create an alert message
router.post('/', async (req, res) => {
    const { message } = req.body;
    try {
        // Use findOneAndUpdate with upsert option to ensure only one document exists
        const alert = await Alert.findOneAndUpdate(
            { _id: 1 }, // Using a static ID for the single document
            { message: message },
            { new: true, upsert: true } // Options to return the updated document and create a new one if it doesn't exist
        );
        // await trigger();
        res.json(alert);
    } catch (error) {
        console.error('Failed to update or create alert message:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;