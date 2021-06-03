const express = require("express");
const router = express.Router();


const {
  sendmail,
} = require("../controllers/sendmailController.js");

router.post("/", sendmail);


module.exports = router;