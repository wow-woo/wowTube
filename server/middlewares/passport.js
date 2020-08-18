import passport from "passport";
import User from "../db/models/UserModel";
import GitHubStrategy from "passport-github2";
import FacebookStrategy from "passport-facebook";
import dotenv from "dotenv";
import UserModel from "../db/models/UserModel";

dotenv.config();

//local
passport.use(User.createStrategy());

passport.serializeUser(
  User.serializeUser()
  // function (user, done) {done(null, user.id);}
);

passport.deserializeUser(
  User.deserializeUser()
  // function (id, done) { User.findById(id, function (err, user) {done(err, user) })}
);

//github
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `http://localhost:5000/auth/github/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      const {
        _json: { id, avatar_url, name, email },
      } = profile;

      try {
        const user = await UserModel.findOne({ email });

        if (user) {
          user.githubId = id;
          user.save();
          return done(null, user);
        } else {
          let no_email = email;
          if (!email) {
            no_email = "no email";
          }

          const newUser = await UserModel.create({
            githubId: id,
            name,
            email: no_email,
            avatarURL: avatar_url,
          });

          return done(null, newUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const {
        _json: { id, name, email },
      } = profile;

      try {
        const user = await UserModel.findOne({ email });

        if (user) {
          user.facebookId = id;
          user.avatarURL
            ? null
            : (user.avatarURL = `https://graph.facebook.com/${id}picture?type=large`);
          user.save();
          return done(null, user);
        } else {
          let no_email = email;
          if (!email) {
            no_email = "no email";
          }

          const newUser = await UserModel.create({
            facebookId: id,
            name,
            email: no_email,
            avatarURL: `https://graph.facebook.com/${id}picture?type=large`,
          });

          return done(null, newUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
