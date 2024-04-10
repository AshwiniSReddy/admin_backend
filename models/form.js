const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    name:String,
    email:String,
    phoneNumber:Number,
    message:String
},{ timestamps: true });

const Form = mongoose.model('FormDetails', FormSchema);

module.exports = Form;

