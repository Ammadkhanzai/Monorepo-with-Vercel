const express = require("express");
const router = express.Router();


const {
    addImpression,
    addClick,
    addDownload,
    addReview
} = require("../controllers/statisticController");


router.get('/impression/', addImpression);
router.get('/click/', addClick);
router.get('/download/', addDownload);
router.get('/review/', addReview);

module.exports = router;