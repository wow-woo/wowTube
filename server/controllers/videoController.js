import VideoModel from "../db/models/VideoModel";
import CommentModel from "../db/models/CommentModel";

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
  const { originalname, mimetype, location, size } = req.file;

  const newVideo = await VideoModel.create({
    videoURL: location,
    title,
    description,
    creator: req.user.id,
  });

  req.user.videos.push(newVideo.id);
  req.user.save();

  res.redirect(res.locals.routes.video_detail(newVideo.id));
};

const formatTime = (comments) => {
  let newComments = [];

  comments.forEach((comment) => {
    const createTime = comment.createdAt;
    const timeDiff = Date.now() - Date.parse(`${createTime}`);

    const com = Object.assign(comment._doc, { timeDiff });

    newComments.push(com);
  });

  return newComments;
};

export const videoDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await VideoModel.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "writer", select: ["name", "avatarURL"] },
      });

    const newComments = formatTime(video.comments);

    res.render("videoDetail", { video, newComments });
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

export const getViewHandler = async (req, res) => {
  try {
    const videoID = req.params.id;
    const viewCount = await VideoModel.findById(videoID);
    return res.json(viewCount.views);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const postViewHandler = async (req, res) => {
  try {
    const videoID = req.params.id;
    await VideoModel.findByIdAndUpdate(
      videoID,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const postAddComment = async (req, res) => {
  const videoID = req.params.id;
  const text = req.body.text;

  try {
    const comment = { writer: req.user.id, text };
    const newComment = Promise.resolve(CommentModel.create(comment));
    const video = Promise.resolve(VideoModel.findById(videoID));

    const result = await Promise.allSettled([newComment, video]);
    result[1].value.comments.push(result[0].value._id);
    result[1].value.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  const videoID = req.params.id;
  const { text, timeDiff } = req.body;

  try {
    const video = await VideoModel.findById(videoID).populate("comments");
    const comment = await CommentModel.findOne({ writer: req.user.id, text });

    const green = video.comments.filter((com) => {
      return com.id === comment.id;
    });

    if (green.length !== 0) {
      comment.remove();
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
