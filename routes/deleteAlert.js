// adminRoutes.js
const express = require('express');
const router = express.Router();
const Alert= require('../models/alert'); // Adjust the path according to your project structure
const trigger=require('../mongotrigger/Trigger')



// DELETE route for /admin to delete the alert message
router.delete('/', async (req, res) => {
    try {
        // Use findOneAndDelete or deleteOne to remove the document with _id: 1
        const result = await Alert.findOneAndDelete({ _id: 1 });

        if (result) {
            res.json({ message: 'Alert message deleted successfully.' });
            await trigger();
        } else {
            // If no document was found (and thus none deleted), inform the requester
            res.status(404).json({ message: 'No alert message found to delete.' });
            await trigger();
        }
    } catch (error) {
        console.error('Failed to delete alert message:', error);
        res.status(500).send('Server error');
    }
});

module.exports=router;
