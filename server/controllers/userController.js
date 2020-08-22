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
  req.logout();

  res.redirect(res.locals.routes.home);
};

export const users = (req, res) => res.render("users");

export const getMe = (req, res) => res.render("userDetail", { user: req.user });

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const user = await UserModel.findById(id).populate("videos");

    console.log("user", user);

    res.render("userDetail", { user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => res.render("editProfile");

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file: { path },
  } = req;

  try {
    const obj = {};
    path ? (obj.avatarURL = `/${path}`) : null;
    name ? (obj.name = name) : null;
    email ? (obj.email = email) : null;

    await UserModel.findByIdAndUpdate(req.user._id, obj);

    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.redirect(routes.edit_profile);
  }
};

export const getChangePassword = (req, res) => res.render("changePassword");

export const postChangePassword = async (req, res) => {
  const {
    body: { o_password, n_password, c_password },
  } = req;

  try {
    if (c_password !== n_password) {
      res.status(400);
      res.redirect(`/users${routes.change_password}`);

      return;
    }

    await req.user.changePassword(o_password, n_password);

    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.redirect(`/users${routes.change_password}`);
  }
};
