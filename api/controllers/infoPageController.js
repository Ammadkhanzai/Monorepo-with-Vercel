const infoPage = require("../models/InfoPage");
// @desc        Get all Categories
// @route       GET /api/category
// @access      Private
exports.createInfoPage = async (req, res, next) => {

    try {
      // Getting categories from DB
      await infoPage.deleteMany();
      const newInfoPage = new infoPage({
        title: req.body.title,
        email: req.body.email,
        content: req.body.content,
      });
      newInfoPage.save()
  
      // Sending success response
      res.status(200).json({
        success: true,
        data: newInfoPage
      });
    } catch (err) {
      // Sending error response
      res.status(400).json({
        success: false,
        error:err,
        message:"no result found"
      });
    }
  };


exports.fetchInfoPage = async (req, res, next) => {
    
    infoPage.find()
    .then((response) => {
      res.status(200).json({
          success: true,
          data : response,
      });
    })
    .catch((error) => res.status(400).json({success:false, message: error }));

};  