const isProvider = (req, res, next) => {
    if (req.user && req.user.role === "provider") {
        next();
    } else {
        res.status(403).send({ message: "Access denied. Provider role required." });
    }
}

module.exports = isProvider;