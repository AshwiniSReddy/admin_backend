const mongoose = require('mongoose');

const FormHistory = new mongoose.Schema({
    name:String,
    email:String,
    phoneNumber:Number,
    organisationName:String,
    message:String
},{ timestamps: true });

const FormHistoryDataTest= mongoose.model('FormHistoryTest', FormHistory);

module.exports = FormHistoryDataTest;