const mongoose = require("mongoose");

const StatisticSchema = new mongoose.Schema({
    impressions : {
        type: Number,
        trim: true,
    },  
    clicks : {
        type: Number,
        trim: true,
    },  
    downloads : {
        type: Number,
        trim: true,
    },  
    reviews : {
        type: Number,
        trim: true,
    },  
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Statistic", StatisticSchema);
