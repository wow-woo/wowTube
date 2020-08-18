import express from "express";
import routeAddress from "../routes/routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  getMe,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares/authMiddleware";

const rootRouter = express.Router();

rootRouter.get("/", home);

//join

rootRouter.get(routeAddress.join, onlyPublic, getJoin);
rootRouter.post(routeAddress.join, onlyPublic, postJoin, postLogin);

//login
rootRouter.get(routeAddress.login, onlyPublic, getLogin);
rootRouter.post(routeAddress.login, onlyPublic, postLogin);

rootRouter.get(routeAddress.me, onlyPrivate, getMe);

rootRouter.get(routeAddress.logout, onlyPrivate, logout);

rootRouter.get(routeAddress.search, search);

export default rootRouter;
