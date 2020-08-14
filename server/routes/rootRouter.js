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
import { onlyPublic } from "../middlewares/authMiddleware";

const rootRouter = express.Router();

rootRouter.get("/", home);

//join

rootRouter.get(routeAddress.join, onlyPublic, getJoin);
rootRouter.post(routeAddress.join, onlyPublic, postJoin, postLogin);

//login
rootRouter.get(routeAddress.login, onlyPublic, getLogin);
rootRouter.post(routeAddress.login, onlyPublic, postLogin);

rootRouter.get(routeAddress.logout, logout);

rootRouter.get(routeAddress.search, search);

export default rootRouter;
