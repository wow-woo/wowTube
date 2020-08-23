"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.userDetail = exports.getMe = exports.users = exports.logout = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _UserModel = _interopRequireDefault(require("../db/models/UserModel"));

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getJoin = function getJoin(req, res) {
  res.render("join");
};

exports.getJoin = getJoin;

var postJoin = function postJoin(req, res, next) {
  var _req$body, name, email, password, password2, user;

  return regeneratorRuntime.async(function postJoin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

          if (!(password !== password2)) {
            _context.next = 6;
            break;
          }

          res.status(400);
          res.render("join");
          _context.next = 18;
          break;

        case 6:
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap((0, _UserModel["default"])({
            name: name,
            email: email
          }));

        case 9:
          user = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(_UserModel["default"].register(user, password));

        case 12:
          next();
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](6);
          res.render("error", {
            error: _context.t0
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 15]]);
};

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  res.render("login");
};

exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate("local", {
  failureRedirect: _routes["default"].login,
  successRedirect: _routes["default"].home
});

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  //log user out
  req.logout();
  res.redirect(res.locals.routes.home);
};

exports.logout = logout;

var users = function users(req, res) {
  return res.render("users");
};

exports.users = users;

var getMe = function getMe(req, res) {
  return res.render("userDetail", {
    user: req.user
  });
};

exports.getMe = getMe;

var userDetail = function userDetail(req, res) {
  var id, user;
  return regeneratorRuntime.async(function userDetail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_UserModel["default"].findById(id).populate("videos"));

        case 4:
          user = _context2.sent;
          console.log("user", user);
          res.render("userDetail", {
            user: user
          });
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          res.redirect(_routes["default"].home);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.userDetail = userDetail;

var getEditProfile = function getEditProfile(req, res) {
  return res.render("editProfile");
};

exports.getEditProfile = getEditProfile;

var postEditProfile = function postEditProfile(req, res) {
  var _req$body2, name, email, location, obj;

  return regeneratorRuntime.async(function postEditProfile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, location = req.file.location;
          _context3.prev = 1;
          obj = {};
          location ? obj.avatarURL = location : null;
          name ? obj.name = name : null;
          email ? obj.email = email : null;
          _context3.next = 8;
          return regeneratorRuntime.awrap(_UserModel["default"].findByIdAndUpdate(req.user._id, obj));

        case 8:
          res.redirect(_routes["default"].me);
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);
          res.redirect(_routes["default"].edit_profile);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 11]]);
};

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  return res.render("changePassword");
};

exports.getChangePassword = getChangePassword;

var postChangePassword = function postChangePassword(req, res) {
  var _req$body3, o_password, n_password, c_password;

  return regeneratorRuntime.async(function postChangePassword$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, o_password = _req$body3.o_password, n_password = _req$body3.n_password, c_password = _req$body3.c_password;
          _context4.prev = 1;

          if (!(c_password !== n_password)) {
            _context4.next = 6;
            break;
          }

          res.status(400);
          res.redirect("/users".concat(_routes["default"].change_password));
          return _context4.abrupt("return");

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(req.user.changePassword(o_password, n_password));

        case 8:
          res.redirect(_routes["default"].me);
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);
          res.redirect("/users".concat(_routes["default"].change_password));

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 11]]);
};

exports.postChangePassword = postChangePassword;