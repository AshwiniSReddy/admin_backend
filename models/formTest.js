const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    name:String,
    email:String,
    phoneNumber:Number,
    organisationName:String,
    message:String
},{ timestamps: true });

const Form = mongoose.model('FormTest', FormSchema);

module.exports = Form;
