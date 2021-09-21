import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  PodcastID: {
    type: String,
    required: true,
  },
});

export const TrendingModel = mongoose.model("TrendingModel", Schema);
