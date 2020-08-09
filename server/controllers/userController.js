import UserModel from "../db/models/UserModel";
import passport from "passport";
import routes from "../routes/routes";

export const getJoin = (req, res) => {
  res.render("join");
};
export const postJoin = async (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  if (password !== password2) {
    res.status(400);
    res.render("join");
  } else {
    try {
      //register user
      const user = await UserModel({ name, email });
      await UserModel.register(user, password);
      next();
    } catch (error) {
      res.render("error", { error });
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login");
};
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  //log user out

  res.redirect(res.locals.routes.home);
};

export const users = (req, res) => res.render("users");
export const userDetail = (req, res) => res.render("userDetail");
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");
