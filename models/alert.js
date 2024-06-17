const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        default: 1 // Assuming a static ID of 1 for the single document
    },
    message: {
        type: String,
        required: true
    }
});

const Alert = mongoose.model('AlertMessage', alertSchema);

module.exports = Alert;

