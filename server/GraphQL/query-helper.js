import { UserModel } from "../Models/userModel.js";
import { PodcastSchema } from "./Schema.js";

export const GetMyTopArtists = async (artists) => {
  const response = await UserModel.find({
    _id: {
      $in: artists,
    },
  }, {
      _id: 1,
      Username: 1,
      Email: 1,
      Profile: 1
  });

  return response;
};

export const GetPodcastData = async(podcasts) => {
    const response = await PodcastSchema.find({_id: {
        $in: podcasts
    }});
    return response;
}