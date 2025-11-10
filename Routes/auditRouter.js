const express = require("express");
const auditRouter = express.Router();
const Audit = require("../Models/AuditSchema");
const auth = require("../Middleware/auth");
const isPatient = require("../Middleware/isPatient");

auditRouter.post("/", auth, isPatient, async (req, res) => {
  try {
    const userId = req.user.id;
    let audit = await Audit.findOne({ user: userId });
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

auditRouter.get("/", async (req, res) => {
    const audits = await Audit.find({})
    try {
        if(!audits){
            return res.status(400).send({ message: "No audits found" });
        }
        res.status(200).send(audits)
    } catch (error) {
        res.status(500).send({message: "Server error." + error})
    }
})

module.exports = auditRouter
