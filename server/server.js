import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
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

dotenv.config();

const app = express();
app.set("view engine", "pug");

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
    // this is for https connection for secureg
    // cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

//root routes
app.use("/", rootRouter);
//sub routes
app.use("/auth", socialLoginRoute);
app.use("/users", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use("/videos", videoRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on " + port);
});
