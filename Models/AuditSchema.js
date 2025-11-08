const mongoose = require("mongoose");

const AuditSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "USER_REGISTERED",
        "USER_LOGGED_IN",
        "VIEW_PATIENT_PROFILE",
        "UPDATE_PATIENT_PROFILE",
        "ADMIN_VIEWS_AUDIT_LOGS",
        "USER_REGISTRATION",
      ],
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    ipAddress: {
      type: String,
    },
  },
  { timestamps: true, updatedAt: false }
);

module.exports = mongoose.model("Audit", AuditSchema);
