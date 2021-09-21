import { UserModel } from "../Models/userModel.js";

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
