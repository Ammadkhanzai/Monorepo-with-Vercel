const mongoose = require("mongoose");

const SoftwareSchema = new mongoose.Schema({
    softwareName: {
        type: String,
        required: [true, "Software Name field is required"],
        trim: true,
        Minlength: [2, "Software Name cannot be less than 2 characters"],
        Maxlength: [50, "Software Name cannot be less than 50 characters"],
    },
    softwareVersion: {
        type: String,
        required: [true, "Software Version field is required"],
        trim: true,
        Minlength: [1, "Software Name cannot be less than 1 characters"],
        Maxlength: [50, "Software Name cannot be less than 50 characters"],
    },
    softwareCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },
    softwareDescription: {
        type: String,
        required: [true, "Software Version field is required"],
        trim: true,
        Minlength: [1, "Software Name cannot be less than 1 characters"],
        Maxlength: [500, "Software Name cannot be less than 50 characters"],
    },
    softwareIcon: {
        type: String,
        required: [true, "Software icon field is required"],
        trim: true
    },
    softwareRequirement: {
        type: String,
        required: [true, "Software requirement field is required"],
        trim: true
    },
    softwareLanguage: {
        type: String,
        required: [true, "Software language field is required"],
        trim: true
    },
    softwareAvailableLanguage: {
        type: String,
        required: [true, "Software available Language field is required"],
        trim: true
    },
    softwareLicense: {
        type: String,
        required: [true, "Software License field is required"],
        trim: true
    },
    softwareAuthor: {
        type: String,
        required: [true, "Software Author field is required"],
        trim: true
    },
    softwareSHA: {
        type: String,
        trim: true
    },
    softwareScreenshot: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Software screenshot field is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

});


// aa
module.exports = mongoose.model("Software", SoftwareSchema);
