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

const Alert_test = mongoose.model('AlertMessage_test', alertSchema);

module.exports = Alert_test;

