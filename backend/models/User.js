// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likedMovies: [
    {
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movies" },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  watchLater: [
    {
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movies" },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("User", userSchema);
