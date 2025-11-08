const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema");

const auth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).send({ message: "Not Authorized, token failed." });
    }
  }
};

module.exports = auth;
