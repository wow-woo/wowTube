import express from "express";
import routeAddress from "../routes/routes";
import {
  getUpload,
  postUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo,
  video,
} from "../controllers/videoController";
import { multerVideo } from "../middlewares/multerMiddleware";
import { onlyPrivate } from "../middlewares/authMiddleware";

const videoRouter = express.Router();

videoRouter.get("/", video);

videoRouter.get(routeAddress.upload, onlyPrivate, getUpload);
videoRouter.post(routeAddress.upload, onlyPrivate, multerVideo, postUpload);

videoRouter.get(routeAddress.edit_video(), onlyPrivate, getEditVideo);

videoRouter.post(routeAddress.edit_video(), onlyPrivate, postEditVideo);

videoRouter.get(routeAddress.delete_video(), onlyPrivate, deleteVideo);

videoRouter.get(routeAddress.video_detail(), videoDetail);

export default videoRouter;
