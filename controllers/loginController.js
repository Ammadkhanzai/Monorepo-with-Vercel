const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const createToken = (email, userid , permissions) => {
  return jwt.sign(
    {
      email: email,
      userId: userid,
      permissions: permissions,
    },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );
};

exports.login = async (req, res, next) => {
  // console.log("user hit login controller function");
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (!result) {
          return res
            .status(400)
            .json({ success:false, message: "Authentication failed , Invalid login.", response: result });
        }
        const token = createToken(user.email, user._id ,user.permissions);
        // res.cookie('jwt',token,  { httpOnly:true,maxAge: 3600000 });
        return res
          .status(200)
          .json({ success:true , message: "Auth successfull", Token: token , user: user.permissions });
      });
    })
    .catch((err) => res.status(400).json({ success:false, message: "Auth failed" }));
};

exports.logout = async (req, res, next) => {  
  return res.status(200).json({ success:true , message: "logout successfull" });
};

exports.validate = async (req, res, next)=>{
  return res.status(200).json({ success:true , message: "Auth successfull", Token: req.params.Token , user : req.params.Permissions  });
}