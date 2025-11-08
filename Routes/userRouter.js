const express = require("express");
const userRouter = express.Router();
const User = require("../Models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    await newUser.save();

    const payload = {
      userId: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res
      .status(201)
      .json({ message: "User registered successfully", token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  try {
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid password" });
    }
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ message: "Login successful", token: token });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = userRouter;
