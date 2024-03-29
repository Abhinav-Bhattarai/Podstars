import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString
} = require("graphql");
import { TrendingModel } from "../Models/trending.js";
import { cache } from "../server.js";
import { CheckAuthorization } from "./helper.js";
import {
  GetCachedTrendingData,
  GetMyFavoraiteArtistsList,
  GetMyFavoraitePodcastsList,
  GetMyTopArtistsData,
  
  GetPodcastData,
} from "./query-helper.js";
import { PodcastSchema, UserSchema } from "./Schema.js";

const RootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
  
    GetProfileData: {
      type: UserSchema,
      args: { userID: { type: GraphQLString } }, 
      resolve: (_, args, context) => {  
        const { userID } = args;
        const { id, uid, authToken } = context;
        const authStatus = CheckAuthorization(authToken, id, uid);
        if (authStatus) {
          if (userID === id) {
            // this is the profile page for the admin
          } else {
            // this is a lookup profile-page
          }
        }
      }
    },

    GetTrendingData: {
      type: new GraphQLList(PodcastSchema),
      resolve: async () => {
        const CachedData = await GetCachedTrendingData();
        if (CachedData === null) {
          const Trending = await TrendingModel.findOne({});
          // write-back to cache
          if (Trending) {
            if (Trending.Podcasts) {
              await cache.set(
                "TrendingPodcasts",
                JSON.stringify(Trending.Podcasts)
              );
            }
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
      resolve: async (_, args, context) => {
        const { id, authToken, uid } = context.cookies;
        const authStatus = CheckAuthorization(authToken, id, uid);
        if (authStatus) {
          const ArtistsID = await GetMyFavoraiteArtistsList(id);
          if (ArtistsID) {
            const ArtistsData = await GetMyTopArtistsData(ArtistsID);
            return ArtistsData;
          }
        }
      },
    },

    GetMyFavoraitePodcasts: {
      type: new GraphQLList(PodcastSchema),
      resolve: async (_, args, context) => {
        const { id, authToken, uid } = context.cookies;
        const authStatus = CheckAuthorization(authToken, id, uid);
        if (authStatus) {
          const FavoraiteList = GetMyFavoraitePodcastsList(id);
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
