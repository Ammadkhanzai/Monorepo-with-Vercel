const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth.js');
// Users controller
const {
    getUsers,
    getUser,
    deleteUser,
    createUser,
    updateUser
} = require("../controllers/userController");

router.get("/",getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);;

module.exports = router;
