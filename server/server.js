import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import localsMiddleware from "./middlewares/localsMiddleware";
import rootRouter from "./routes/rootRouter";
import videoRouter from "./routes/videoRouter";
import userRouter from "./routes/userRouter";

const app = express();
app.set("view engine", "pug");

//global middleware
app.use(helmet());
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(localsMiddleware);

//root routes
app.use("/", rootRouter);
//sub routes
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const port = 5000;
app.listen(port, () => {
  console.log("listening on " + port);
});
