import express from "express";
import routeAddress from "../routes/routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", users);

userRouter.get(routeAddress.edit_profile, editProfile);

userRouter.get(routeAddress.user_detail(), userDetail);

userRouter.get(routeAddress.change_password, changePassword);

export default userRouter;
