import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { PatientContextProvider } from "./Context/PatientContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <PatientContextProvider>
        <App />
      </PatientContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
