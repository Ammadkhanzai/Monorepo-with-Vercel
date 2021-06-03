const multer = require("multer");
let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    let response = "File type didn`t match";
    return cb(new Error(response), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = (req, res, next) => {
  
  
  const cpUpload = upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "screenshots", maxCount: 8 },
  ]);
  
  cpUpload(req, res, function (errCustom) {

    // return ;
    // console.log(req.body);
    if(!req.files.icon){
      res.status(401).json({success: false , message: 'Icon is required!'});
      return;
    }
    if (errCustom instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("A Multer error occurred when uploading");
      return res.status(401).json({success: false , message: 'A Multer error occurred while uploading', multerError :errCustom });
    } else if (errCustom) {
      // An unknown error occurred when uploading.
      console.log("An unknown error occurred when uploading");
      return res.status(401).json({success: false ,  message:errCustom.toString() });
    }
    // Everything went fine.

    next(); 
  });
  
};
