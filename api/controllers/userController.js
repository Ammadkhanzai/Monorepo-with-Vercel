const User = require("../models/User");
const bcrypt = require("bcrypt");
// @desc        Get all users
// @route       GET /api/users
// @access      Private
exports.getUsers = async (req, res, next) => {
  try {
    // Getting users from DB
    const users = await User.find();

    // Sending success response
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    // Sending error response
    res.status(400).json({
      success: false,
    });
  }
};

// @desc        Get single user
// @route       GET /api/users/:id
// @access      Private
exports.getUser = async (req, res, next) => {
  
  try {
    // Getting a single user from DB
    
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400).json({
        success: false,
      });
    }

    // Sending success response
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    // Sending error response
    res.status(400).json({
      success: false,
    });
  }
};

// @desc        Create new user
// @route       POST /api/users
// @access      Private



exports.createUser = async (req, res, next) => {
  User.find({ email: req.body.email })
    .then((user) => {
      userLength = Object.keys(user).length;
      if (userLength >= 1) {
        return res.status(400).json({ success:false, message: "User alredy exist" });
      }
      if (!req.body.email) {
        return res.status(400).json({ success:false, message: "Email not found" });
      }
      if (!req.body.password) {
        return res.status(400).json({ success:false, message: "Password not found" });
      }
      if (!req.body.username) {
        return res.status(400).json({success:false, message: "Username not found" });
      }
      if (!req.body.firstname) {
        return res.status(400).json({ success:false, message: "First Name not found" });
      }
      if (!req.body.lastname) {
        return res.status(400).json({success:false,  message: "Last Name not found" });
      }

      if (!req.body.permissions) {
        return res.status(400).json({success:false, message: "Permissions not found" });
      }

      bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
          return res.status(400).json({ success:false, message: err });
        }
        const newUser = new User({
          email: req.body.email,
          password: hash,
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          permissions: req.body.permissions,
        });
        newUser
          .save()
          .then((response) =>
            res.status(200).json({
              success: true,
              data: response
            })
          )
          .catch((err) => {
            if (err.name === 'MongoError' && err.code === 11000) {
              res.status(400).json({ success:false, message: "Username must be unique" })
            } else {
              res.status(400).json({ success:false, message: err })
            }
          });
      });
    })
    .catch((err) => res.status(400).json({ success:false, message: err , new : "testing2" }));
};







// @desc        Update single user
// @route       PUT /api/users/:id
// @access      Private
exports.updateUser = async (req, res, next) => {
  
  User.findOne({ _id : req.params.id })
    .then(async (response) => {
      let hashedPassword = false;
      let userLength = Object.keys(response).length;

      if (userLength < 1) {
        return res.status("401").json({success:false, message: "User not found exist" });
      }
      if(req.body.password){
         hashedPassword = await bcrypt.hash(req.body.password , 10);
      }
      response.password = hashedPassword ? hashedPassword : response.password;
      response.username = req.body.username ? req.body.username : response.username;
      response.firstname = req.body.firstname ? req.body.firstname : response.firstname;
      response.lastname = req.body.lastname ? req.body.lastname : response.lastname;
      response.role = req.body.role ? req.body.role : response.role;
      response.permissions = req.body.permissions ? req.body.permissions : response.permissions;
      response.save()
      .then(() => res.status(200).json({ success : true , message: 'Users has been updated' }))
      .catch(err => res.status(400).json({ success:false, message: err }))
    })
    .catch((err) => res.status(400).json({ success:false, message: err }));
};

// @desc        Delete single user
// @route       POST /api/users/:id
// @access      Private
exports.deleteUser = async (req, res, next) => {
  try {
    // Uodating a user in DB
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(400).json({
        success: false,
      });
    }

    // Sending success response
    res.status(201).json({
      success: true,
      data: {},
    });
  } catch (error) {
    // Sending error response
    res.status(400).json({
      success: false,
    });
  }
};
