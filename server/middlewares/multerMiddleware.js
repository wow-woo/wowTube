const multer = require("multer");

export default multer({ dest: "uploads/videos" }).single("videoFile");
