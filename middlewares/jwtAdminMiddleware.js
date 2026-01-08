const jwt = require("jsonwebtoken");
const jwtAdminMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    if (token) {
      // logic of decoding

      let jwtData = await jwt.verify(token, process.env.jwtSecret);
      if (jwtData) {
       if(jwtData.userType=='Admin'){
         req.userMail = jwtData.email;
        next();
       }else{
        res.status(401).json({message:"This operation can only be done by admin users"})
       }
      } else {
        res.status(400).json({ meassage: "invalid token,please login" });
      }
    } else {
      res.status(400).json({ meassage: "no token found please login" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "error occurred in server while validating token" });
  }
};

module.exports = jwtAdminMiddleware;
