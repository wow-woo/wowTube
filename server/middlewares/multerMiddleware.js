const multer = require("multer");

export const multerVideo = multer({ dest: "uploads/videos" }).single(
  "videoFile"
);

export const multerAvatar = multer({ dest: "uploads/avatars" }).single(
  "avatar"
);
