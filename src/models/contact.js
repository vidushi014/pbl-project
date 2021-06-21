const mongoose = require('mongoose');

const contactschema = new mongoose.Schema({
    firstname :{
        type: String,
        required:true
    },
    lastname :{
        type: String,
        required:true
    },
    country :{
        type: String,
        required: true
    },
    subject :{
        type: String,
        required:true
    }
})

const Contact = new mongoose.model("Contact",contactschema );
module.exports = Contact;
