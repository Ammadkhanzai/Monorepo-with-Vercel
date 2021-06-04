const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth.js');


const { login , logout ,validate } = require("../controllers/loginController");

router.post("/",login);
router.get("/verifyToken/",auth,validate);
router.post("/logout",logout);

module.exports = router;
