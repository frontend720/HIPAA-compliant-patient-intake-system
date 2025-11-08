const express = require("express");
const patientRouter = express.Router();
const Patient = require("../Models/PatientSchema");
const auth = require("../Middleware/auth");
const isPatient = require("../Middleware/isPatient");

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

patientRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let patient = await Patient.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
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

patientRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById({ _id: id });
    if (!patient) {
      return res.status(400).send({ message: "Patient not found" });
    }
    if (!id) {
      return res.status(400).send({ message: "Patient ID is required" });
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send({ message: "Server error." + error });
  }
});

patientRouter.get("/", async (req, res) => {
  try {
    const patient = await Patient.find({});
    if (!patient) {
      return res.status(400).send({ message: "No patients found" });
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send({ message: "Server error." + error });
  }
});

module.exports = patientRouter;
