"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multerAvatar = exports.multerVideo = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _multerS = _interopRequireDefault(require("multer-s3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var multer = require("multer");

var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_SECRET,
  region: "ap-northeast-1"
});
var multerVideo = multer({
  storage: new _multerS["default"]({
    s3: s3,
    acl: "public-read",
    bucket: "wow-tube/videos"
  })
}).single("videoFile");
exports.multerVideo = multerVideo;
var multerAvatar = multer({
  storage: new _multerS["default"]({
    s3: s3,
    acl: "public-read",
    bucket: "wow-tube/avatars"
  })
}).single("avatar");
exports.multerAvatar = multerAvatar;