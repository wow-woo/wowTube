"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postDeleteComment = exports.postAddComment = exports.postViewHandler = exports.getViewHandler = exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.video = exports.search = exports.home = void 0;

var _VideoModel = _interopRequireDefault(require("../db/models/VideoModel"));

var _CommentModel = _interopRequireDefault(require("../db/models/CommentModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var home = function home(req, res) {
  var videos;
  return regeneratorRuntime.async(function home$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(res.locals);
          _context.next = 4;
          return regeneratorRuntime.awrap(_VideoModel["default"].find({}));

        case 4:
          videos = _context.sent;
          res.render("home", {
            page: "page",
            videos: videos
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.render("error", {
            error: _context.t0
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.home = home;

var search = function search(req, res) {
  var searchingBy, videos_title, videos_des, videos;
  return regeneratorRuntime.async(function search$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          searchingBy = req.query.term;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_VideoModel["default"].find({
            title: {
              $regex: searchingBy,
              $options: "i"
            }
          }));

        case 4:
          videos_title = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(_VideoModel["default"].find({
            description: {
              $regex: searchingBy,
              $options: "i"
            }
          }));

        case 7:
          videos_des = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(Object.assign(videos_title, videos_des));

        case 10:
          videos = _context2.sent;
          res.render("search", {
            searchingBy: searchingBy,
            videos: videos
          });
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);
          res.render("error", {
            error: _context2.t0
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 14]]);
};

exports.search = search;

var video = function video(req, res) {
  return res.render("videos");
};

exports.video = video;

var getUpload = function getUpload(req, res) {
  res.render("upload");
};

exports.getUpload = getUpload;

var postUpload = function postUpload(req, res) {
  var _req$body, title, description, _req$file, originalname, mimetype, location, size, newVideo;

  return regeneratorRuntime.async(function postUpload$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, description = _req$body.description;
          _req$file = req.file, originalname = _req$file.originalname, mimetype = _req$file.mimetype, location = _req$file.location, size = _req$file.size;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_VideoModel["default"].create({
            videoURL: location,
            title: title,
            description: description,
            creator: req.user.id
          }));

        case 4:
          newVideo = _context3.sent;
          req.user.videos.push(newVideo.id);
          req.user.save();
          res.redirect(res.locals.routes.video_detail(newVideo.id));

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.postUpload = postUpload;

var formatTime = function formatTime(comments) {
  var newComments = [];
  comments.forEach(function (comment) {
    var createTime = comment.createdAt;
    var timeDiff = Date.now() - Date.parse("".concat(createTime));
    var com = Object.assign(comment._doc, {
      timeDiff: timeDiff
    });
    newComments.push(com);
  });
  return newComments;
};

var videoDetail = function videoDetail(req, res) {
  var id, _video, newComments;

  return regeneratorRuntime.async(function videoDetail$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_VideoModel["default"].findById(id).populate("creator").populate({
            path: "comments",
            populate: {
              path: "writer",
              select: ["name", "avatarURL"]
            }
          }));

        case 4:
          _video = _context4.sent;
          newComments = formatTime(_video.comments);
          res.render("videoDetail", {
            video: _video,
            newComments: newComments
          });
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.render("error", {
            error: _context4.t0
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.videoDetail = videoDetail;

var getEditVideo = function getEditVideo(req, res) {
  var id, _video2;

  return regeneratorRuntime.async(function getEditVideo$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_VideoModel["default"].findById(id));

        case 4:
          _video2 = _context5.sent;

          if (!(_video2.creator == req.user.id)) {
            _context5.next = 9;
            break;
          }

          res.render("editVideo", {
            video: _video2
          });
          _context5.next = 10;
          break;

        case 9:
          throw Error();

        case 10:
          _context5.next = 15;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          res.render("error", {
            error: _context5.t0
          });

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.getEditVideo = getEditVideo;

var postEditVideo = function postEditVideo(req, res) {
  var id;
  return regeneratorRuntime.async(function postEditVideo$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_VideoModel["default"].findByIdAndUpdate(id, req.body));

        case 4:
          res.redirect(res.locals.routes.video_detail(id));
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](1);
          res.render("error", {
            error: _context6.t0
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

exports.postEditVideo = postEditVideo;

var deleteVideo = function deleteVideo(req, res) {
  var id, _video3;

  return regeneratorRuntime.async(function deleteVideo$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_VideoModel["default"].findById(id));

        case 4:
          _video3 = _context7.sent;

          if (!(_video3.creator == req.user.id)) {
            _context7.next = 11;
            break;
          }

          _context7.next = 8;
          return regeneratorRuntime.awrap(_VideoModel["default"].findByIdAndRemove(id));

        case 8:
          res.redirect(res.locals.routes.home);
          _context7.next = 12;
          break;

        case 11:
          throw Error();

        case 12:
          _context7.next = 17;
          break;

        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](1);
          res.render("error", {
            error: _context7.t0
          });

        case 17:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 14]]);
};

exports.deleteVideo = deleteVideo;

var getViewHandler = function getViewHandler(req, res) {
  var videoID, viewCount;
  return regeneratorRuntime.async(function getViewHandler$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          videoID = req.params.id;
          _context8.next = 4;
          return regeneratorRuntime.awrap(_VideoModel["default"].findById(videoID));

        case 4:
          viewCount = _context8.sent;
          return _context8.abrupt("return", res.json(viewCount.views));

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          res.status(400);

        case 12:
          _context8.prev = 12;
          res.end();
          return _context8.finish(12);

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8, 12, 15]]);
};

exports.getViewHandler = getViewHandler;

var postViewHandler = function postViewHandler(req, res) {
  var videoID;
  return regeneratorRuntime.async(function postViewHandler$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          videoID = req.params.id;
          _context9.next = 4;
          return regeneratorRuntime.awrap(_VideoModel["default"].findByIdAndUpdate(videoID, {
            $inc: {
              views: 1
            }
          }, {
            "new": true
          }));

        case 4:
          _context9.next = 10;
          break;

        case 6:
          _context9.prev = 6;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          res.status(400);

        case 10:
          _context9.prev = 10;
          res.end();
          return _context9.finish(10);

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 6, 10, 13]]);
};

exports.postViewHandler = postViewHandler;

var postAddComment = function postAddComment(req, res) {
  var videoID, text, comment, newComment, _video4, result;

  return regeneratorRuntime.async(function postAddComment$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          videoID = req.params.id;
          text = req.body.text;
          _context10.prev = 2;
          comment = {
            writer: req.user.id,
            text: text
          };
          newComment = Promise.resolve(_CommentModel["default"].create(comment));
          _video4 = Promise.resolve(_VideoModel["default"].findById(videoID));
          _context10.next = 8;
          return regeneratorRuntime.awrap(Promise.allSettled([newComment, _video4]));

        case 8:
          result = _context10.sent;
          result[1].value.comments.push(result[0].value._id);
          result[1].value.save();
          _context10.next = 17;
          break;

        case 13:
          _context10.prev = 13;
          _context10.t0 = _context10["catch"](2);
          console.log(_context10.t0);
          res.status(400);

        case 17:
          _context10.prev = 17;
          res.end();
          return _context10.finish(17);

        case 20:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[2, 13, 17, 20]]);
};

exports.postAddComment = postAddComment;

var postDeleteComment = function postDeleteComment(req, res) {
  var videoID, _req$body2, text, timeDiff, _video5, comment, green;

  return regeneratorRuntime.async(function postDeleteComment$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          videoID = req.params.id;
          _req$body2 = req.body, text = _req$body2.text, timeDiff = _req$body2.timeDiff;
          _context11.prev = 2;
          _context11.next = 5;
          return regeneratorRuntime.awrap(_VideoModel["default"].findById(videoID).populate("comments"));

        case 5:
          _video5 = _context11.sent;
          _context11.next = 8;
          return regeneratorRuntime.awrap(_CommentModel["default"].findOne({
            writer: req.user.id,
            text: text
          }));

        case 8:
          comment = _context11.sent;
          green = _video5.comments.filter(function (com) {
            return com.id === comment.id;
          });

          if (!(green.length !== 0)) {
            _context11.next = 14;
            break;
          }

          comment.remove();
          _context11.next = 15;
          break;

        case 14:
          throw Error();

        case 15:
          _context11.next = 21;
          break;

        case 17:
          _context11.prev = 17;
          _context11.t0 = _context11["catch"](2);
          console.log(_context11.t0);
          res.status(400);

        case 21:
          _context11.prev = 21;
          res.end();
          return _context11.finish(21);

        case 24:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[2, 17, 21, 24]]);
};

exports.postDeleteComment = postDeleteComment;