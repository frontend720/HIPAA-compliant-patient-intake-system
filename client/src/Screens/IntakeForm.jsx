import React, { useContext } from "react";
import { PatientContext } from "../Context/PatientContext";
import "./IntakeForm.css";

export default function IntakeForm() {
  const {
    dob,
    phone,
    street,
    city,
    state,
    zipCode,
    provider,
    policyNumber,
    emergencyName,
    relationship,
    emergencyPhone,
    onDobChange,
    onPhoneChange,
    onStreetChange,
    onCityChange,
    onStateChange,
    onZipChange,
    onProviderChange,
    onPolicyNumberChange,
    onEmergencyNameChange,
    onRelationshipChange,
    onEmergencyPhoneChange,
  } = useContext(PatientContext);

  console.log({
    PatientInformation: provider,
    policyNumber,
    dob,
    phone,
    street,
    city,
    state,
    zipCode,
    emergencyName,
    relationship,
    emergencyPhone
  });

  return (
    <div>
      <form action="" className="patient-intake-form">
        <h1 className="title">Intake Form</h1>
        <h2>Insurance Information</h2>
        <div className="form-section">
          <input
            type="text"
            placeholder="Insurance Provider"
            className="form-input"
            name="provider"
            value={provider}
            onChange={onProviderChange}
          />
          <input
            type="text"
            placeholder="Policy Number"
            className="form-input"
            name="policyNumber"
            value={policyNumber}
            onChange={onPolicyNumberChange}
          />
        </div>
        <h2>Patient Information</h2>
        <span>DOB</span>
        <div className="form-section">
          <input
            type="date"
            className="form-input"
            placeholder="DOB"
            name="d0b"
            value={dob}
            onChange={onDobChange}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Primary Phone"
            name="phone"
            value={phone}
            onChange={onPhoneChange}
          />
        </div>
        <div className="form-section">
          <input
            type="text"
            className="form-input"
            placeholder="Street Address"
            name="street"
            value={street}
            onChange={onStreetChange}
          />
          <input
            type="text"
            className="form-input"
            placeholder="City"
            name="city"
            value={city}
            onChange={onCityChange}
          />
        </div>
        <div className="form-section">
          <input
            type="text"
            className="form-input"
            placeholder="State"
            name="state"
            value={state}
            onChange={onStateChange}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Zip Code"
            name="zipCode"
            value={zipCode}
            onChange={onZipChange}
          />
        </div>
        <h2>Emergency Contact</h2>
        <div className="form-section">
          <input
            type="text"
            className="form-input"
            placeholder="Emergency Contact Name"
            name="emergencyName"
            value={emergencyName}
            onChange={onEmergencyNameChange}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Relationship"
            name="relationship"
            value={relationship}
            onChange={onRelationshipChange}
          />
        </div>
        <div className="form-section">
          <input
            type="text"
            className="form-input"
            placeholder="Phone"
            name="emergencyPhone"
            value={emergencyPhone}
            onChange={onEmergencyPhoneChange}
          />
        </div>
      </form>
    </div>
  );
}
