import { UserModel } from "../Models/userModel.js";
import { cache } from "../server.js";
import { PodcastSchema, UserSchema } from "./Schema.js";

export const GetMyTopArtists = async (artists) => {
  const response = await UserModel.find(
    {
      _id: {
        $in: artists,
      },
    },
    {
      _id: 1,
      Username: 1,
      Email: 1,
      Profile: 1,
    }
  );

  return response;
};

export const GetCachedTrendingData = async () => {
  // Array of PodcastID;
  const UnserializedData = await cache.get("TrendingPodcasts");
  if (UnserializedData) {
    const CachedData = JSON.parse(UnserializedData);
    return CachedData;
  }
  return null;
};

export const GetPodcastData = async (podcasts) => {
  const response = await PodcastSchema.find({
    _id: {
      $in: podcasts,
    },
  });
  return response;
};

export const GetMyTopArtistsData = async (artists) => {
  const response = await UserSchema.find(
    {
      _id: {
        $in: artists,
      },
    },
    { Username: 1, Podcasts: 1, Profile: 1 }
  );
  return response;
};

export const GetMyFavoraiteArtistsList = async (id) => {
  const response = await UserModel.findById(id);
  if (response) {
    if (response.FavoraiteArtists.length > 0) return response.FavoraiteArtists;
    return null;
  }
  return null;
};

export const GetMyFavoraitePodcastsList = async (id) => {
  const response = await UserModel.findById(id);
  if (response) {
    if (response.FavoraitePodcasts.length > 0)
      return response.FavoraitePodcasts;
    return null;
  }
  return null;
};
