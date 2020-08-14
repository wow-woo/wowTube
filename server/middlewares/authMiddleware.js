import routes from "../routes/routes";

export const onlyPublic = (req, res, next) => {
  //authenticating...
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  //authenticating...
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
