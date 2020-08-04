import mongoose from "mongoose";
import UserModel from "./UserModel";

const DislikeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
  },
  count: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("DislikeModel", DislikeSchema);
