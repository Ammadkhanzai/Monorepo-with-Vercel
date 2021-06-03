const Categories = require("../models/Categories");

// @desc        Get all Categories
// @route       GET /api/category
// @access      Private
exports.getCategories = async (req, res, next) => {
  try {
    // Getting categories from DB
    const categories = await Categories.find().select('-__v');
    // .sort( { createdAt: 1 } )


    // Sending success response
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (err) {
    // Sending error response
    res.status(400).json({
      success: false,
      error: err,
      message: "no result found"
    });
  }
};

// @desc        Get single category
// @route       GET /api/category/:id
// @access      Private
exports.getCategory = async (req, res, next) => {
  try {
    // Getting a single category from DB
    const category = await Categories.findById(req.params.id).select('-__v -createdAt');

    if (category) {
      // Sending success response
      res.status(200).json({
        success: true,
        data: category,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "no result found"
      });
    }

  } catch (err) {
    // Sending error response
    res.status(400).json({
      success: false,
      error: err,
      message: "invalid data"
    });
  }
};



// @desc        Get single category
// @route       GET /api/category/:title
// @access      Private
exports.getCategoryByTitle = async (req, res, next) => {
  try {
    // Getting a single category from DB
    
    const findCategory = await Categories.find({ categoryName: req.params.title });

    if (findCategory.length !== 0 ) {
      // Sending success response
      res.status(200).json({
        success: true,
        data: findCategory,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "no result found"
      });
    }

  } catch (err) {
    // Sending error response
    res.status(400).json({
      success: false,
      error: err,
      message: "invalid data"
    });
  }
};



// @desc        Create New category
// @route       POST /api/category
// @access      Private
exports.createCategories = async (req, res, next) => {
  try {

    if (req.body.categoryName.match(/^[a-zA-Z ]*$/) === null) {
      return res.status(400).json({
        success: false,
        message: "only Letters and spaces allowed"
      });
    }

    let newCategoryName = await req.body.categoryName.toLowerCase().trim().split(' ').join('-');

    const findCategory = await Categories.find({ categoryName: newCategoryName });

    // Creating a category in DB
    if (findCategory.length < 1) {
      const newCategory = await Categories.create({ categoryName: newCategoryName });
      if (!newCategory) {
        res.status(400).json({
          success: false,
          message: "invalid data"
        });
      }

      const createdCategory = {
        _id: newCategory._id,
        categoryName: newCategory.categoryName
      }

      // Sending success response
      res.status(201).json({
        success: true,
        data: createdCategory,
        message: "new category created successfully"
      });

    } else {
      res.status(409).json({
        message: "category already exists"
      });
    }

  } catch (err) {
    // Sending error response
    res.status(400).json({
      success: false,
      error: err
    });
  }
};

// @desc        Update single Category
// @route       PUT /api/category/:id
// @access      Private
exports.updateCategory = async (req, res, next) => {
  try {
    
    if (req.body.categoryName.match(/^[a-zA-Z ]*$/) === null) {
      return res.status(400).json({
        success: false,
        message: "only alphabets allowed"
      });
    }

    let newCategoryName = await req.body.categoryName.toLowerCase().trim().split(' ').join('-');
    
    // Uodating a category in DB
    const category = await Categories.findByIdAndUpdate(req.body.id, { categoryName: newCategoryName }, {
      new: true,
      runValidators: true,
    });

    if (category) {
      // Sending success response
      res.status(201).json({
        success: true,
        data: category,
        message: "category updated successfully"
      });

    } else {
      res.status(400).json({
        success: false,
        message: "invalid data"
      });
    }
  } catch (err) {
    // Sending error response
    res.status(400).json({
      success: false,
      error: err
    });
  }
};

// @desc        Delete single Category
// @route       DELETE /api/category/:id
// @access      Private
exports.deleteCategory = async (req, res, next) => {
  try {
    // Uodating a user in DB
    const category = await Categories.deleteOne({ _id: req.params.id });

    if (!category) {
      res.status(400).json({
        success: false,
        message: "invalid data"
      });
    }

    // Sending success response
    if (category.deletedCount > 0) {
      res.status(201).json({
        success: true,
        data: {},
        message: "category has been deleted"
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'you are trying to delete non existing data'
      })
    }
  } catch (err) {
    // Sending error response
    res.status(400).json({
      success: false,
      error: err
    });
  }
};