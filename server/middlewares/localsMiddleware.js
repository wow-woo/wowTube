import routes from "../routes/routes";

export default (req, res, next) => {
  res.locals.siteName = "Wowtube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  return next();
};
