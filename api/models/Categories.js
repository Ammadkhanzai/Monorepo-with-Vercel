const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
    categoryName : {
    type: String,
    required: [true, "Please enter category name"],
    trim: true,
    minlength: [4, "category name cannot be less than 4 characters"],
    maxlength: [30, "category name cannot be more than 30 characters"],
  },  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Categories", CatSchema);