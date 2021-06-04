const mongoose = require("mongoose");
const pages = require('../utils/pages');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter first name"],
    trim: true,
    maxlength: [32, "First name cannot be more than 32 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please enter last name"],
    trim: true,
    maxlength: [32, "Last name cannot be more than 32 characters"],
  },
  permissions: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: pages
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please enter a valid email",
    ],
  },
  username: {
    type: String,
    required: [true, "Please enter username"],
    unique: [true,"Username must be unique"],
    minlength: [4, "Username cannot be less than 4 characters"],
    maxlength: [16, "Username cannot be more than 16 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [4, "Password cannot be less than 4 characters"],
    maxlength: [64, "Password cannot be more than 16 characters"],
  },
  role: {
    type: String,
    enum: ['moderator', 'admin'],
    default: 'moderator'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);