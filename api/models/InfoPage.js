const mongoose = require("mongoose");

const InfoPageSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, "Please enter title"],
        trim: true,
    },  
    email : {
        type: String,
        required: [true, "Please enter email"],
        match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please enter a valid email",
        ],
    },  
    content : {
        type: String,
        required: [true,"Page content is required"],
        trim: true,
    },  
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("InfoPage", InfoPageSchema);
