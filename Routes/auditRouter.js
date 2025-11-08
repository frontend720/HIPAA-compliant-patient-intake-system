const express = require("express");
const auditRouter = express.Router();
const Audit = require("../Models/AuditSchema");
const auth = require("../Middleware/auth");
const isPatient = require("../Middleware/isPatient");

auditRouter.post("/", auth, isPatient, async (req, res) => {
  try {
    const userId = req.user.id;
    let audit = await Audit({ user: userId });
    if (!audit) {
      return res.status(400).send({ message: "Audit already exists." });
    }
    audit = new Audit({
      ...req.body,
      user: userId,
    });
    await audit.save();
    res.status(201).send({ message: "Audit created successfully", audit });
  } catch (error) {
    res.status(500).send({ message: "Server error." + error });
  }
});

module.exports = auditRouter
