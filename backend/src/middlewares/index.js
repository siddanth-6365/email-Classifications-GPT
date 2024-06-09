const checkAuth = (req, res, next) => {
  if (!req.session.tokens) {
    req.session.redirectTo = req.originalUrl;
    return res.status(401).redirect("/auth");
  }
  next();
};

module.exports = {
  checkAuth,
};
