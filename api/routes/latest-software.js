const express = require("express");
const router = express.Router();


const {
  addLastestSoftware,
  fetchLastestSoftwares,
  fetchLastestSoftwaresById,
  remove,
  removeByColoumn
} = require("../controllers/latestSoftwareController.js");


router.post("/", addLastestSoftware);
router.get("/:limit?", fetchLastestSoftwares);
router.get("/single/:id", fetchLastestSoftwaresById);
router.delete("/", remove);
router.delete("/column", removeByColoumn);

module.exports = router;
