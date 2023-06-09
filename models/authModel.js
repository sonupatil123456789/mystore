const mongoose = require("mongoose")


const userAuthScheema = new mongoose.Schema({
    userId: {
        type: String,
        unique:true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
        default:"johndeo@gmail.com"
    },
    number: {
        type: String,
        default: ""
    },
    password : {
        type: String,
        default: 0,
        require : true,
        unique : true
    },
    images: {
        type: String,
    },
    birthdate: {
        type: String,
        default:"29/03/2000"
        // required: true
    },
    address: {
        type: String,
        default:""
    },
    token: {
        type: String,
        require : true
    },
    progress : {
        type: Number,
        default: 0
    },
    createdAt: { 
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("userAuthScheema", userAuthScheema);