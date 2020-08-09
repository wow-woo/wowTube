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

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  try {
    //make it better with promise later
    const videos_title = await VideoModel.find({
      title: { $regex: searchingBy, $options: "i" },
    });
    const videos_des = await VideoModel.find({
      description: { $regex: searchingBy, $options: "i" },
    });
    const videos = await Object.assign(videos_title, videos_des);

    console.log(videos);
    res.render("search", { searchingBy, videos });
  } catch (error) {
    res.render("error", { error });
  }
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

export const videoDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await VideoModel.findById(id);
    res.render("videoDetail", { video });
  } catch (error) {
    res.render("error", { error });
  }
};
export const getEditVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await VideoModel.findById(id);
    res.render("editVideo", { video });
  } catch (error) {
    res.render("error", { error });
  }
};
export const postEditVideo = async (req, res) => {
  const id = req.params.id;
  try {
    await VideoModel.findByIdAndUpdate(id, req.body);
    res.redirect(res.locals.routes.video_detail(id));
  } catch (error) {
    res.render("error", { error });
  }
};
export const deleteVideo = async (req, res) => {
  const id = req.params.id;

  try {
    await VideoModel.findByIdAndRemove(id);
    res.redirect(res.locals.routes.home);
  } catch (error) {
    res.render("error", { error });
  }
};
