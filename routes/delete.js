const express = require('express');
const router = express.Router();
const upload = require('../multer/multer'); // Ensure the path is correct based on your project structure
const Admin = require('../models/Admin'); // Ensure this path matches the location of your Admin model
const trigger=require('../mongotrigger/Trigger')




// DELETE route for /admin/:id
router.delete('/:id', async (req, res) => {
    try {
        const adminId = req.params.id; // Capture the id from URL parameters

        // Attempt to find and delete the admin entry by its id
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);

        // If no admin found, return 404 Not Found
        if (!deletedAdmin) {
            return res.status(404).json({
                message: 'Admin not found with id ' + adminId,
            });
        }
<<<<<<< HEAD
        // await trigger();
=======
        await trigger();
>>>>>>> c162da0325602faaf17b0b456da2461c12b75281
        // If delete was successful, return success response
        res.status(200).json({
            message: 'Admin successfully deleted',
            data: deletedAdmin, // Optionally return the data of the deleted admin
        });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({
            message: 'Error deleting admin',
            error: error.message,
        });
    }
});
module.exports = router;