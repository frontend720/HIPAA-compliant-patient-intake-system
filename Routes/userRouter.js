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

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const audit = new Audit({
      user: user._id,
      action: "USER_LOGGED_IN",
      ipAddress: req.ip,
    });
    await audit.save();
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
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
    console.error("LOGIN ERROR:", error);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = userRouter;
