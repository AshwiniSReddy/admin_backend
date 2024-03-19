const express = require('express');
const router = express.Router();
const Alert = require('../models/alert'); // Adjust the path according to your project structure
const trigger=require('../mongotrigger/Trigger')
// GET route for /admin
router.get('/', async (req, res) => {
    try {
        // Attempt to find the existing alert
        const existingAlert = await Alert.findOne();
        await trigger();
        if (existingAlert) {
            // If an existing alert is found, return it
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).json({

                message: 'Alert found successfully',
                data: existingAlert,
            });
        } else {
            // If no alert is found, return a message indicating such
            res.status(404).json({
                message: 'No alert message found',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error processing your request',
            error: error.message,
        });
    }
});

module.exports = router;
