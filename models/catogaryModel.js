const mongoose = require("mongoose")

const categoryScheema = new mongoose.Schema({
    title: {
        type: String,
        require : true
    },
    discription : {
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

module.exports = mongoose.model("Category", categoryScheema )