const express = require("express");
const patientRouter = express.Router();
const Patient = require("../Models/PatientSchema");
const Audit = require("../Models/AuditSchema");
const auth = require("../Middleware/auth");
const isPatient = require("../Middleware/isPatient");
const isProviderOrSelf = require("../Middleware/isProviderOrSelf.js");

patientRouter.post("/", auth, isPatient, async (req, res) => {
  try {
    const userId = req.user.id;

    let patient = await Patient.findOne({ user: userId });
    if (patient) {
      return res.status(400).send({ message: "Patient already exists." });
    }
    patient = new Patient({
      ...req.body,
      user: userId,
    });
    await patient.save();

    res
      .status(201)
      .send({ message: "Patient profile created successfully", patient });
  } catch (error) {
    res.status(500).send({ message: "Server error." + error });
  }
});

patientRouter.patch("/:id", auth, isPatient, async (req, res) => {
  try {
    const { id } = req.params;
    let patient = await Patient.findOneAndUpdate(
      { user: id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    const audit = new Audit({
      user: patient._id,
      action: "UPDATE_PATIENT_PROFILE",
      ipAddress: req.ip,
      targetUser: id,
    });
    audit.save();
    if (!patient) {
      return res.status(400).send({ message: "Patient not found" });
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send({ message: "Server error." + error });
  }
});

patientRouter.get("/", async (req, res) => {
  const patients = await Patient.find({});
  if (!patients) {
    return res.status(400).send({ message: "No patients found" });
  }
  try {
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send({ message: "Server error." + error });
  }
});

patientRouter.get("/:id", auth, isProviderOrSelf, async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send({ message: "Patient ID is required" });
    }
    const patient = await Patient.findOne({ user: id });
    if (!patient) {
      return res.status(400).send({ message: "Patient not found" });
    }

    const audit = new Audit({
      user: patient._id,
      action: "VIEW_PATIENT_PROFILE",
      ipAddress: req.ip,
      targetUser: id,

    });
     await audit.save();
 
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send({ message: "Server error." + error });
  }
});
// const patient = await Patient.findById({ _id: id });

patientRouter.delete("/:id", auth, isPatient, async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByIdAndDelete({ _id: id });
    if (!patient) {
      return res.status(400);
    }
    return res.status(200).send({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error." + error });
  }
});

module.exports = patientRouter;
