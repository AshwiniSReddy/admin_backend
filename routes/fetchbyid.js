const express = require('express');
const router = express.Router();
const upload = require('../multer/multer'); // Ensure the path is correct based on your project structure
const Admin = require('../models/Admin'); // Ensure this path matches the location of your Admin model




// DELETE route for /admin/:id
router.get('/:id', async (req, res) => {
    try {
        const adminId = req.params.id; // Capture the id from URL parameters

        // Attempt to find and delete the admin entry by its id
        const fetchEvent = await Admin.findById(adminId);

        // If no admin found, return 404 Not Found
        if (!fetchEvent) {
            return res.status(404).json({
                message: 'Event not found with id ' + adminId,
            });
        }
        

        await trigger();
        // If delete was successful, return success response
        res.status(200).json({
            message: 'data fetched successfuly',
            data: fetchEvent, // Optionally return the data of the deleted admin
        });
    } catch (error) {
        console.error('Error fetching event data:', error);
        res.status(500).json({
            message: 'error fecting data with event id',
            error: error.message,
        });
    }
});
module.exports = router;