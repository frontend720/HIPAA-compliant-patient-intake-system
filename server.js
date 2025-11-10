const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan("dev"));
require("dotenv").config();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/patient-intake-system");

app.use("/", require("./Routes/userRouter"));
app.use("/patients", require("./Routes/patientRouter"));
app.use("/audits", require("./Routes/auditRouter"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
