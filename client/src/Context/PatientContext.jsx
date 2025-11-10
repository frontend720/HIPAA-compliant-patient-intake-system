import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";

const PatientContext = React.createContext();
axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

function PatientContextProvider({ children }) {
  const { token, patientId } = useContext(AuthContext);

  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [provider, setProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  console.log(patientId);

  async function createPatientData() {
    const patient = await axios({
      method: "POST",
      url: import.meta.env.VITE_BASE_URL + "/patients",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        dob: dob,
        phone: phone,
        address: {
          street: street,
          city: city,
          state: state,
          zipCode: zipCode,
        },
        insurance: {
          provider: provider,
          policyNumber: policyNumber,
        },
        emergencyContact: {
          name: emergencyName,
          relationship: relationship,
          phone: emergencyPhone,
        },
      },
    });
    try {
      return console.log(patient.data);
    } catch (error) {
      return console.log("Create patient data error: ", error);
    }
  }

  function onDobChange(e) {
    setDob(e.target.value);
  }
  function onPhoneChange(e) {
    setPhone(e.target.value);
  }
  function onStreetChange(e) {
    setStreet(e.target.value);
  }

  function onCityChange(e) {
    setCity(e.target.value);
  }
  function onStateChange(e) {
    setState(e.target.value);
  }

  function onZipChange(e) {
    setZipCode(e.target.value);
  }
  function onProviderChange(e) {
    setProvider(e.target.value);
  }
  function onPolicyNumberChange(e) {
    setPolicyNumber(e.target.value);
  }

  function onEmergencyNameChange(e) {
    setEmergencyName(e.target.value);
  }

  function onRelationshipChange(e) {
    setRelationship(e.target.value);
  }

  function onEmergencyPhoneChange(e) {
    setEmergencyPhone(e.target.value);
  }

  async function updatePatientData() {
    const updatePatient = await axios({
      method: "PATCH",
      url: import.meta.env.VITE_BASE_URL + `/patients/${patientId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        dob: "1989-04-28",
        phone: "303-505-3775",
        address: {
          street: "670 Winona CT #26",
          city: "Denver",
          state: "CO",
          zipCode: "80204",
        },
        insurance: {
          provider: "BlueCross",
          policyNumber: "X123456789",
        },
        emergencyContact: {
          name: "Jared Manwaring",
          relationship: "Brother",
          phone: "385-386-3890",
        },
      },
    });
    try {
      return updatePatient.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function retrievePatientData() {
    try {
      const getPatient = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + `/patients/${patientId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(getPatient.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PatientContext.Provider
      value={{
        createPatientData,
        updatePatientData,
        retrievePatientData,
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
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export { PatientContext, PatientContextProvider };
