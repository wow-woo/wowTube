export default (req, res, next) => {
  //authenticating...
  // if true
  res.locals.user = req.user || {};
  console.log(req.user);

  next();
};
