const jwt = require("jsonwebtoken");
const jwtMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    if (token) {
      // logic of decoding

      let jwtData = await jwt.verify(token, process.env.jwtSecret);
      if (jwtData) {
        req.userMail = jwtData.email;
        
        next();
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

module.exports = jwtMiddleware;
