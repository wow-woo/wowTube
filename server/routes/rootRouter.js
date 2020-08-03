import express from "express";
import routeAddress from "../routes/routes";
import { home, search } from "../controllers/videoController";
import { join, login, logout } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.get(routeAddress.join, join);

rootRouter.get(routeAddress.login, login);

rootRouter.get(routeAddress.logout, logout);

rootRouter.get(routeAddress.search, search);

export default rootRouter;
