const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    email :{
        type: String,
        required:true
    },
    password :{
        type: String,
        required:true
    }
})

const User = new mongoose.model("User",userschema );
module.exports = User;
