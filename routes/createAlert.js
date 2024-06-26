// adminRoutes.js
const express = require('express');
const router = express.Router();
const Alert= require('../models/alert'); // Adjust the path according to your project structure
const trigger=require('../mongotrigger/Trigger')
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
<<<<<<< HEAD
        // await trigger();
=======
        await trigger();
>>>>>>> c162da0325602faaf17b0b456da2461c12b75281
        res.json(alert);
    } catch (error) {
        console.error('Failed to update or create alert message:', error);
        res.status(500).send('Server error');
    }
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;

//ncjhj
>>>>>>> c162da0325602faaf17b0b456da2461c12b75281
