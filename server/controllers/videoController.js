import { videos } from "../db";

export const home = (req, res) => {
  res.render("home", { page: "page", videos });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;

  res.render("search", { searchingBy });
};
export const video = (req, res) => res.render("video");
export const upload = (req, res) => res.render("upload");
export const videoDetail = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");
