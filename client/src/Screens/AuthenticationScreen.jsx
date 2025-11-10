import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { PatientContext } from "../Context/PatientContext.jsx";
import "./Authentication.css";


export default function AuthenticationScreen() {
  const {
    registerUser,
    loginUser,
    emailChange,
    passwordChange,
    firstNameChange,
    lastNameChange,
    roleChange,
    email,
    password,
    firstName,
    lastName,
    role,
  } = useContext(AuthContext);
  const { createPatientData, updatePatientData, retrievePatientData } = useContext(PatientContext); 

  const [authenticationToggle, setAuthenticationToggle] = useState(true);

  function toggleAuthenticationType() {
    setAuthenticationToggle((prev) => !prev);
  }
  return (
    <div>
      <form className="authentication-form" action="">
        <input
          type="email"
          placeholder="Email"
          onChange={emailChange}
          name="email"
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={passwordChange}
          name="password"
          value={password}
        />
        <div style={authenticationToggle ? { display: "block" } : { display: "none" }}>

        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={firstNameChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={lastNameChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="role"
          value={role}
          onChange={roleChange}
          placeholder="User Role"
        />
        </div>
        <button onClick={authenticationToggle ? registerUser : loginUser}>{authenticationToggle ? "Register" : "Login"}</button>
        <p onClick={toggleAuthenticationType}>{authenticationToggle ? "Login" : "Register  "}</p>
      </form>
      <button onClick={createPatientData}>New Patient</button>
      <button onClick={updatePatientData}>Update Patient</button>
      <button onClick={retrievePatientData}>Retrieve Patient</button>
    </div>
  );
}
