import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
import { TrendingModel } from "../Models/trending.js";
import { cache } from "../server.js";
import { CheckAuthorization } from "./helper.js";
import {
  GetCachedTrendingData,
  GetMyFavoraiteArtistsList,
  GetMyFavoraitePodcastsList,
  GetMyTopArtists,
  GetMyTopArtistsData,
  GetPodcastData,
} from "./query-helper.js";
import { PodcastSchema, UserSchema } from "./Schema.js";

const RootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    GetTrendingData: {
      type: new GraphQLList(PodcastSchema),
      resolve: async () => {
        const CachedData = await GetCachedTrendingData();
        if (CachedData === null) {
          const Trending = await TrendingModel.find({});
          // write-back to cache
          if (Trending.Podcasts) {
            await cache.set(
              "TrendingPodcasts",
              JSON.stringify(Trending.Podcasts)
            );
          }
          const PodcastData = await GetPodcastData(Trending.Podcasts);
          return PodcastData;
        }
        const PodcastData = await GetPodcastData(CachedData);
        return PodcastData;
      },
    },

    GetTopLivePodcasts: {
      type: new GraphQLList(PodcastSchema),
      resolve: async () => {
        return [];
      },
    },

    GetMyFavoraiteArtists: {
      type: UserSchema,
      args: {
        userID: { type: GraphQLString },
        authToken: { type: GraphQLString },
        uid: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const { userID, authToken, uid } = args;
        console.log(userID, authToken, uid);
        const authStatus = CheckAuthorization(authToken, userID, uid);
        if (authStatus) {
          const ArtistsID = await GetMyFavoraiteArtistsList(userID);
          if (ArtistsID) {
            const ArtistsData = await GetMyTopArtistsData(ArtistsID);
            return ArtistsData;
          }
        }
      },
    },

    GetMyFavoraitePodcasts: {
      type: new GraphQLList(PodcastSchema),
      args: {
        userID: { type: GraphQLString },
        authToken: { type: GraphQLString },
        uid: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const { userID, authToken, uid } = args;
        console.log(userID, authToken, uid);
        const authStatus = CheckAuthorization(authToken, userID, uid);
        if (authStatus) {
          const FavoraiteList = GetMyFavoraitePodcastsList(userID);
          if (FavoraiteList) {
            const PodcastData = await GetPodcastData(FavoraiteList);
            return PodcastData;
          }
        }
      },
    },
  },
});

// const Mutation = new GraphQLObjectType({
//   name: "mutation",
// });

export const MainSchema = new GraphQLSchema({
  query: RootQuery,
});
