const mongoose = require("mongoose")

const brandScheema = new mongoose.Schema({
    title: {
        type: String,
        require : true
    },
    discription : {
        type: String,
        require : true
    },
    brandImage : {
        type: String,
        require : true
    },
    createdAt: { 
        type: Date,
        default: Date.now,
    },
    updatedOn: { 
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Brand", brandScheema )