export const getJoin = (req, res) => {
  res.render("join");
};
export const postJoin = (req, res) => {
  const { name, email, password, password2 } = req.body;
  console.log(password, password2);
  if (password !== password2) {
    res.status(400);
    res.render("join");
  } else {
    //register user
    //
    res.redirect(res.locals.routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render("login");
};
export const postLogin = (req, res) => {
  let userCheck = true;
  if (userCheck === true) {
    res.redirect(res.locals.routes.home);
  } else {
    res.render("login", { re: "user info doesn't match" });
  }
};

export const logout = (req, res) => {
  //log user out

  res.redirect(res.locals.routes.home);
};

export const users = (req, res) => res.render("users");
export const userDetail = (req, res) => res.render("userDetail");
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");
