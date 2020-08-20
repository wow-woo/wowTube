import express from "express";

import { viewHandler } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.get("/:id/view", viewHandler);

export default apiRouter;
