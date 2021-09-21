import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  Podcasts: {
    type: [String],
    default: [],
  },
});

export const TrendingModel = mongoose.model("TrendingModel", Schema);