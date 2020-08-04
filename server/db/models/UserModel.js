import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  id: {
    type: Number,
    required: "ID is mandatory",
  },
  email: {
    type: String,
    required: "Email is required",
  },
  name: {
    type: String,
    required: "name is required",
  },
  password: {
    type: String,
    required: "password is required",
  },
  password2: {
    type: String,
    required: "password2 is required",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("UserModel", UserSchema);
