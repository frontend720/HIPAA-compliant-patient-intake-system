const isPatient = async (req, res, next) => {
  if (req.user && req.user.role === "patient") {
    next();
  } else {
    res.status(400).send({ message: "Access denied. Patients only" });
  }
};

module.exports = isPatient;
