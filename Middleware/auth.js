// const jwt = require("jsonwebtoken");
// const User = require("../Models/UserSchema");

// const auth = async (req, res, next) => {
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer ")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.userId).select("-password");
//       next();
//     } catch (error) {
//       res.status(401).send({ message: "Not Authorized, token failed." });
//     }
//   }
// };

// module.exports = auth;

const jwt = require('jsonwebtoken');
const User = require('../Models/UserSchema');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // 1. If no token, send 401. DO NOT call next().
  if (!token) {
    return res.status(401).send({ message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    // 2. If user not found, send 401. DO NOT call next().
    if (!user) {
      return res.status(401).send({ message: 'User not found, authorization denied.' });
    }

    // 3. Only call next() AFTER req.user is set.
    req.user = user;
    next();

  } catch (err) {
    res.status(401).send({ message: 'Token is not valid.' });
  }
};

