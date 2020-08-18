import express from "express";
import routes from "./routes";
import {
  githubLogin,
  githubLoginCallback,
  facebookLogin,
  facebookLoginCallback,
} from "../controllers/snsController";

const socialLoginRoute = express.Router();

socialLoginRoute.get(routes.github, githubLogin);

socialLoginRoute.get("/github/callback", githubLoginCallback);

socialLoginRoute.get(routes.facebook, facebookLogin);

socialLoginRoute.get("/facebook/callback", facebookLoginCallback);

export default socialLoginRoute;
