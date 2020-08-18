import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: "Email is required",
  },
  avatarURL: {
    type: String,
  },
  facebookId: {
    type: Number,
  },
  githubId: {
    type: Number,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VideoModel",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentModel",
    },
  ],
  // password: {
  //   type: String,
  //   required: "password is required",
  // },
  // password2: {
  //   type: String,
  //   required: "password2 is required",
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export default mongoose.model("UserModel", UserSchema);
