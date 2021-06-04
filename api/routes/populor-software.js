const express = require("express");
const router = express.Router();

const {
  addPopulorSoftware,
  fetchPopulorSoftwares,
  remove,
  removeByColoumn
} = require("../controllers/populorSoftwareController.js");


router.post("/", addPopulorSoftware);
router.get("/:limit?", fetchPopulorSoftwares);
router.delete("/", remove);
router.delete("/column", removeByColoumn);



module.exports = router;
