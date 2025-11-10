import React, { useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const[patientId, setPatientId] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    const register = await axios({
      method: "POST",
      url: import.meta.env.VITE_BASE_URL + "/register",
      data: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role,
      },
    });
    try {
        console.log(register.data)
        localStorage.setItem("token", register.data?.token);
      return setToken(register.data?.token);
    } catch (error) {
      console.log("Registration error: ", error);
    }
  }

  async function loginUser(e) {
    e.preventDefault();
    const login = await axios({
      method: "POST",
      url: import.meta.env.VITE_BASE_URL + "/login",
      data: {
        email: email,
        password: password,
        // role: role,
      },
    });
    try {
      setPatientId(login.data?.user?._id);
      localStorage.setItem("token", login.data?.token);
      return setToken(login.data?.token);
    } catch (error) {
      return "Login error: ", error;
    }
  }

  function emailChange(e) {
    setEmail(e.target.value);
  }

  function passwordChange(e) {
    setPassword(e.target.value);
  }
  function firstNameChange(e) {
    setFirstName(e.target.value);
  }
  function lastNameChange(e) {
    setLastName(e.target.value);
  }
  function roleChange(e) {
    setRole(e.target.value);
  }

  return (
    <AuthContext.Provider
      value={{
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
        token,
        patientId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
