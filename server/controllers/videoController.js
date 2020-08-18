import VideoModel from "../db/models/VideoModel";

export const home = async (req, res) => {
  try {
    console.log(res.locals);
    const videos = await VideoModel.find({});
    res.render("home", { page: "page", videos });
  } catch (error) {
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

    res.render("search", { searchingBy, videos });
  } catch (error) {
    res.render("error", { error });
  }
};
export const video = (req, res) => res.render("videos");

export const getUpload = (req, res) => {
  res.render("upload");
};
export const postUpload = async (req, res) => {
  const { title, description } = req.body;
  const { originalname, mimetype, path, size } = req.file;

  const newVideo = await VideoModel.create({
    videoURL: path,
    title,
    description,
    creator: req.user.id,
  });

  req.user.videos.push(newVideo.id);
  req.user.save();

  res.redirect(res.locals.routes.video_detail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await VideoModel.findById(id).populate("creator");

    console.log("video", video);

    res.render("videoDetail", { video });
  } catch (error) {
    res.render("error", { error });
  }
};

export const getEditVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await VideoModel.findById(id);

    if (video.creator == req.user.id) {
      res.render("editVideo", { video });
    } else {
      throw Error();
    }
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
    const video = await VideoModel.findById(id);

    if (video.creator == req.user.id) {
      await VideoModel.findByIdAndRemove(id);

      res.redirect(res.locals.routes.home);
    } else {
      throw Error();
    }
  } catch (error) {
    res.render("error", { error });
  }
};
