import passport from "passport";
import User from "../db/models/UserModel";

passport.use(User.createStrategy());

passport.serializeUser(
  User.serializeUser()
  // function (user, done) {done(null, user.id);}
);

passport.deserializeUser(
  User.deserializeUser()
  // function (id, done) { User.findById(id, function (err, user) {done(err, user) })}
);
