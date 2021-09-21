import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  PodcastImage: {
    type: String,
    required: true,
  },

  Name: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

  VideoID: {
    type: String,
    required: true,
  },

  HostName: {
    type: String,
    required: true,
  },

  HostID: {
    type: String,
    required: true,
  },

  Playbacks: {
    type: Number,
    default: 0,
  },
});

export const PodcastModel = new mongoose.model("PodcastModel", Schema);
