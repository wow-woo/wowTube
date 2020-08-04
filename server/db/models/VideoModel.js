import mongoose from "mongoose";
import LikeModel from "./LikeModel";
import DislikeModel from "./DislikeModel";
import CommentModel from "./CommentModel";

const VideoSchema = new mongoose.Schema({
  videoURL: {
    type: String,
    required: "File URL required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: LikeModel,
  },
  dislikes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DislikeModel,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: CommentModel,
    },
  ],
});

export default mongoose.model("VideoModel", VideoSchema);
