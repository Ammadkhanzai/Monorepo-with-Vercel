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

module.exports = (req, res, next) => {
  try {
    
    const decoded_token = jwt.verify(req.header('AuthorizationToken'), process.env.JWT_KEY);
    
    console.log("Running auth middleware.")
    // console.log(req.headers);
    const email = decoded_token.email
    const userId = decoded_token.userId
    const permissions = decoded_token.permissions
    const token = createToken(email, userId ,permissions);

    req.params.Token = token;
    req.params.Permissions = permissions;
    

    next();
  } catch (error) {
    if(error.name === 'TokenExpiredError') return res.status(404).json({ success:false ,message: "Authentication failed, token expired" })
    return res.status(404).json({ success:false ,message: "Authentication failed, execute middleware" });
  }
};
