import { video } from "../controllers/videoController";

//root
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const GITHUB = "/github";
const FACEBOOK = "/facebook";
const GITHUB_CB = "/github/callback";
const FACEBOOK_CB = "/facebook/callback";

//user info
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_DETAIL = "/:id";
const ME = "/me";

//video
const VIDEO = "/video";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

//API
const VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment/add";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,

  users: USERS,
  user_detail: (userId) => {
    if (userId) {
      return `/users/${userId}`;
    } else {
      return USER_DETAIL;
    }
  },
  edit_profile: EDIT_PROFILE,
  change_password: CHANGE_PASSWORD,

  video: VIDEO,
  upload: UPLOAD,
  video_detail: (videoId) => {
    if (videoId) {
      return `/videos/${videoId}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  edit_video: (videoId) => {
    if (videoId) {
      return `/videos/${videoId}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  delete_video: (videoId) => {
    if (videoId) {
      return `/videos/${videoId}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  github: GITHUB,
  facebook: FACEBOOK,
  github_cb: GITHUB_CB,
  facebook_cb: FACEBOOK_CB,
  me: ME,
  view: VIEW,
  add_comment: ADD_COMMENT,
};

export default routes;
