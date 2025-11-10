const isProviderOrSelf = (req, res, next) => {
  try {
    if (req.user.role === 'provider') {
      return next();
    }
    if (req.user.role === 'patient' && req.user.id === req.params.id) {
      return next();
    }
    res.status(401).send({ message: 'Access denied.' });

  } catch (error) {
    res.status(500).send({ message: 'Server error in middleware.' });
  }
};

module.exports = isProviderOrSelf;