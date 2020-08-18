import express from "express";
import routeAddress from "../routes/routes";
import {
  users,
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares/authMiddleware";
import { multerAvatar } from "../middlewares/multerMiddleware";

const userRouter = express.Router();

userRouter.get("/", users);

userRouter.get(routeAddress.edit_profile, onlyPrivate, getEditProfile);

userRouter.post(
  routeAddress.edit_profile,
  onlyPrivate,
  multerAvatar,
  postEditProfile
);

userRouter.get(routeAddress.change_password, getChangePassword);

userRouter.post(routeAddress.change_password, postChangePassword);

userRouter.get(routeAddress.user_detail(), onlyPrivate, userDetail);

export default userRouter;
