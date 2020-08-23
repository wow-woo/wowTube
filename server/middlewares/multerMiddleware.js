const multer = require("multer");
import awsSDK from "aws-sdk";
import multerS3 from "multer-s3";

const s3 = new awsSDK.S3({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_SECRET,
  region: "ap-northeast-1",
});

export const multerVideo = multer({
  storage: new multerS3({
    s3,
    acl: "public-read",
    bucket: "wow-tube/videos",
  }),
}).single("videoFile");

export const multerAvatar = multer({
  storage: new multerS3({
    s3,
    acl: "public-read",
    bucket: "wow-tube/avatars",
  }),
}).single("avatar");
