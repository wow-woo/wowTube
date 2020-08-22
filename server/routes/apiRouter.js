import express from "express";

import {
  postViewHandler,
  getViewHandler,
  postAddComment,
  postDeleteComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.get("/:id/view", getViewHandler);
apiRouter.post("/:id/view", postViewHandler);

apiRouter.post("/:id/comment/add", postAddComment);
apiRouter.post("/:id/comment/delete", postDeleteComment);

export default apiRouter;
