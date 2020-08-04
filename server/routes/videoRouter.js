import express from "express";
import routeAddress from "../routes/routes";
import {
  getUpload,
  postUpload,
  videoDetail,
  editVideo,
  deleteVideo,
  video,
} from "../controllers/videoController";
import multerMiddleware from "../middlewares/multerMiddleware";

const videoRouter = express.Router();

videoRouter.get("/", video);

videoRouter.get(routeAddress.upload, getUpload);
videoRouter.post(routeAddress.upload, multerMiddleware, postUpload);

videoRouter.get(routeAddress.edit_video, editVideo);
videoRouter.get(routeAddress.delete_video, deleteVideo);
videoRouter.get(routeAddress.video_detail(), videoDetail);

export default videoRouter;
