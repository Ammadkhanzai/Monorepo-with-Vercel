const express = require("express");
const router = express.Router();


const {
    createInfoPage,
    fetchInfoPage,
} = require("../controllers/infoPageController");


router.post('/', createInfoPage);
router.get('/', fetchInfoPage);

module.exports = router;