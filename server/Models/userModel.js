import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },

  CreationDate: {
    type: String,
    required: false,
    default: new Date(parseInt(Date.now())).toLocaleDateString(),
  },

  Profile: {
    type: String,
    required: false,
    default: "",
  },

  Email: {
    type: String,
    required: true,
  },

  uid: {
    type: Number,
    default: Math.floor(Math.random() * 10000000000),
  },

  Favoraites: {
    type: [String],
    default: [],
  },

  Podcasts: {
    type: [String],
    default: [],
  },
});

export const UserModel = mongoose.model("UserModel", Schema);
