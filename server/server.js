import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import flash from "express-flash";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import localsMiddleware from "./middlewares/localsMiddleware";
import rootRouter from "./routes/rootRouter";
import passport from "passport";
import "./middlewares/passport";
import session from "express-session";
import videoRouter from "./routes/videoRouter";
import userRouter from "./routes/userRouter";
import "./db/mongoose";
import connectionMongo from "connect-mongo";
import mongoose from "mongoose";
import dotenv from "dotenv";
import socialLoginRoute from "./routes/socialLoginRoute";
import apiRouter from "./routes/apiRouter";

dotenv.config();

const app = express();
app.set("view engine", "pug");
app.set("trust proxy", true);

const Store = connectionMongo(session);
//global middleware
app.use(helmet());
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new Store({ mongooseConnection: mongoose.connection }),
    unset: "destroy",
    // this is for https connection for secureg
    // cookie: { secure: true, maxAge: 6 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(localsMiddleware);

//root routes
app.use("/", rootRouter);
//sub routes
app.use("/auth", socialLoginRoute);
app.use("/users", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on " + port);
});
