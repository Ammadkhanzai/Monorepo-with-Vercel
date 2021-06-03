const express = require("express");
const router = express.Router();
const fileMiddleware = require("../middleware/multer-error-handle.js");
const updateMiddleware = require("../middleware/update-software-handler.js");


const {
  createSoftware,
  fetchSoftwareByID,
  fetchSoftwares,
  edit,
  remove,
  fetchSoftwareByCategory,
  fetchSoftwaresByTitle,
  search
} = require("../controllers/softwareManagementController.js");


router.post("/", fileMiddleware , createSoftware);
router.get("/fetch", fetchSoftwareByID);
router.get("/fetch/:title", fetchSoftwaresByTitle);
router.get("/search/:title", search);
router.get("/", fetchSoftwares);
router.put("/", updateMiddleware , edit);
router.delete("/", remove);
router.get("/:categoryId/:limit?", fetchSoftwareByCategory);
module.exports = router;
