const mongoose = require('mongoose');

const mainschema = new mongoose.Schema({
    firstname :{
        type: String,
        required:true
    },
    lastname :{
        type: String,
        required:true
    },
    email :{
        type: String,
        required:true
    },
    phone :{
        type:Number,
        required:true
    },
    address :{
        type: String,
        required:true
    },
    city :{
        type: String,
        required:true
    },
    state :{
        type: String,
        required: true
    },
    zipcode :{
        type: String,
        required: true
    },
    help_provided :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required:true
    }
})

const Main = new mongoose.model("Main",mainschema );
module.exports = Main;