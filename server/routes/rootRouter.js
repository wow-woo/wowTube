import express from "express";
import routeAddress from "../routes/routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);

//join
rootRouter.get(routeAddress.join, getJoin);
rootRouter.post(routeAddress.join, postJoin, postLogin);

//login
rootRouter.get(routeAddress.login, getLogin);
rootRouter.post(routeAddress.login, postLogin);

rootRouter.get(routeAddress.logout, logout);

rootRouter.get(routeAddress.search, search);

export default rootRouter;
