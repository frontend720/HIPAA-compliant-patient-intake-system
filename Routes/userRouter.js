const express = require("express");
const userRouter = express.Router();
const User = require("../Models/UserSchema");
const Audit = require("../Models/AuditSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

userRouter.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    });
     const audit = new Audit({
      user: newUser._id,
      action: "USER_REGISTERED",
      ipAddress: req.ip,
    });
    await newUser.save();
    await audit.save()

    const payload = {
      userId: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(201)
      .json({ message: "User registered successfully", token: token, newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// userRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email: email });
//     const audit = new Audit({
//       user: user._id,
//       action: "USER_LOGGED_IN",
//       ipAddress: req.ip,
//     });
//     if (!user) {
//       res.status(404).send({ message: "User not found" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       res.status(401).send({ message: "Invalid password" });
//     }
//     const payload = {
//       userId: user._id,
//       email: user.email,
//       role: user.role,
//     };

//     await audit.save();

//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     res.status(200).send({ message: "Login successful", token: token, user });
//   } catch (error) {
//     res.status(500).send({ message: "Server error" });
//   }
// });

// In userRouter.js
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user AND get the hidden password
    const user = await User.findOne({ email: email }).select('+password');

    // 2. CHECK FOR USER FIRST! (This is the most important fix)
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // 3. Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // 4. SUCCESS! Now it is safe to create the log.
    const audit = new Audit({
      user: user._id,
      action: "USER_LOGGED_IN",
      ipAddress: req.ip,
    });
    await audit.save(); // Save the log

    // 5. Create the payload with the correct 'id' field
    const payload = {
      id: user._id, // Use 'id' so your auth middleware works
      email: user.email,
      role: user.role,
    };

    // 6. Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d", // Using 7d for testing is fine
    });
    
    // 7. Send a safe response (no password hash)
    res.status(200).send({ 
      message: "Login successful", 
      token: token,
      user: { 
        _id: user._id, 
        email: user.email, 
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      } 
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error); // This will log any real errors
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = userRouter;
