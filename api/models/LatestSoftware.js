const mongoose = require("mongoose");

const LatestSoftwareSchema = new mongoose.Schema({
    
    softwareID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Software',
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    }
    
});

module.exports = mongoose.model("LatestSoftware", LatestSoftwareSchema);
