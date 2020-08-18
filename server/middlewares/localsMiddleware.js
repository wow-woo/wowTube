import routes from "../routes/routes";

export default (req, res, next) => {
  res.locals.siteName = "Wowtube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;

  return next();
};
