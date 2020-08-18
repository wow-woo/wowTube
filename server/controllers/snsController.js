import passport from "passport";
import routes from "../routes/routes";

export const githubLogin = passport.authenticate("github");
export const githubLoginCallback = passport.authenticate("github", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const facebookLogin = passport.authenticate("facebook", {
  scope: ["public_profile", "email"],
});
export const facebookLoginCallback = passport.authenticate("facebook", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});
