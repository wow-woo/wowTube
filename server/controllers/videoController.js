import VideoModel from "../db/models/VideoModel";

export const home = async (req, res) => {
  try {
    const videos = await VideoModel.find({});
    res.render("home", { page: "page", videos });
  } catch (error) {
    console.log(error);
    res.render("error", { error });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;

  res.render("search", { searchingBy, videos });
};
export const video = (req, res) => res.render("video");

export const getUpload = (req, res) => {
  res.render("upload");
};
export const postUpload = async (req, res) => {
  const { title, description } = req.body;
  const { originalname, mimetype, path, size } = req.file;

  // console.log(originalname, mimetype, path, size);
  const newVideo = await VideoModel.create({
    videoURL: path,
    title,
    description,
  });

  console.log(newVideo);
  res.redirect(res.locals.routes.video_detail(newVideo.id));
};

export const videoDetail = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");
