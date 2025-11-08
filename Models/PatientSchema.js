const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: [true, "Street address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    zipCode: {
      type: String,
      required: [true, "Zip code is required"],
      trim: true,
    },
  },
  { _id: false }
);

const insuranceSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: [true, "Insurance provider is required"],
      trim: true,
    },
    policyNumber: {
      type: String,
      required: [true, "Policy number is required"],
      trim: true,
    },
    groupNumber: {
      type: String,
    },
  },
  { _id: false }
);

const emergencyContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Emergency contact name is required"],
      trim: true,
    },
    relationship: {
      type: String,
      required: [true, "Relationship is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
  },
  { _id: false }
);

const medicalHistorySchema = new mongoose.Schema(
  {
    allergies: [{ type: String, trim: true }],
    medications: [{ type: String, trim: true }],
    conditions: [{ type: String, trim: true }],
    surgeries: [{ type: String, trim: true }],
    familyHistory: [{ type: String, trim: true }],
  },
  { _id: false }
);

const patientProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    address: addressSchema,
    insurance: insuranceSchema,
    emergencyContact: emergencyContactSchema,
    medicalHistory: medicalHistorySchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientProfileSchema);