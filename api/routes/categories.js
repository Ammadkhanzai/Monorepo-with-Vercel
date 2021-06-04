const express = require("express");
const router = express.Router();

// Users controller
const {
    getCategories,
    createCategories,
    getCategory,
    getCategoryByTitle,
    updateCategory,
    deleteCategory

} = require("../controllers/categoriesController");

router.get('/', getCategories);
router.post('/', createCategories);
router.get("/:id", getCategory);
router.get("/single/:title", getCategoryByTitle);
router.put("/", updateCategory);
router.delete("/:id",deleteCategory);

module.exports = router;