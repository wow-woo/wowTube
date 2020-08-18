import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  text: {
    type: String,
    required: "Text is required",
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LikeModel",
  },
  dislikes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DislikeModel",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("CommentModel", CommentSchema);
