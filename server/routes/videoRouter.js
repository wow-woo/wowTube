import express from "express";
import routeAddress from "../routes/routes";
import {
  upload,
  videoDetail,
  editVideo,
  deleteVideo,
  videos,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", videos);

videoRouter.get(routeAddress.upload, upload);

videoRouter.get(routeAddress.video_detail, videoDetail);

videoRouter.get(routeAddress.edit_video, editVideo);

videoRouter.get(routeAddress.delete_video, deleteVideo);

export default videoRouter;
