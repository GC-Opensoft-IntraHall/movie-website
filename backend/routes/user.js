import express from "express";
const router = express.Router();
import User from "../models/User.js";

router.post("/watchlater/:movieId", async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user auth middleware
    const movieId = req.params.movieId;

    const user = await User.findById(userId);

    // Check if movie is already in watch later
    const exists = user.watchLater.some(
      (item) => item.movieId.toString() === movieId
    );

    if (!exists) {
      user.watchLater.push({ movieId });
      await user.save();
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like a movie
router.post("/like/:movieId", async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.movieId;

    const user = await User.findById(userId);

    // Check if movie is already liked
    const exists = user.likedMovies.some(
      (item) => item.movieId.toString() === movieId
    );

    if (!exists) {
      user.likedMovies.push({ movieId });
      await user.save();
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's watch later list
router.get("/watchlater", async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate(
      "watchLater.movieId",
      "title poster year"
    ); // Only fetch needed fields

    res.json(user.watchLater);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;