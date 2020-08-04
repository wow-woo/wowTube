export default (req, res, next) => {
  //authenticating...
  // if true
  res.locals.user = { isAuthenticated: false, id: 1 };

  next();
};
