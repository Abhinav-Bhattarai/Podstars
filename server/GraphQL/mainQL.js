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
  GetMyFavoraitesList,
  GetPodcastData,
} from "./query-helper.js";
import { PodcastSchema } from "./Schema.js";

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
          await cache.set(
            "TrendingPodcasts",
            JSON.stringify(Trending.Podcasts)
          );
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

    GetMyFavoraitesPodcasts: {
      type: new GraphQLList(PodcastSchema),
      args: {
        userID: { type: GraphQLString },
        authToken: { type: GraphQLString },
        uid: { type: GraphQLInt },
      },
      resolve: async (_, args) => {
        const { userID, authToken, uid } = args;
        const authStatus = CheckAuthorization(authToken, userID, uid);
        if (authStatus) {
          const FavoraiteList = GetMyFavoraitesList(userID);
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
