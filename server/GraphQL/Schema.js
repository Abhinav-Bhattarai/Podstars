import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
} = require("graphql");

const UserSchema = new GraphQLObjectType({
  name: "UserSchema",
  fields: () => {
    return {
      _id: { type: GraphQLID },
      
      Username: { type: GraphQLString },
      
      Email: { type: GraphQLString },
      
      Profile: { type: GraphQLString },

      TopArtistsList: {
        type: UserSchema,
        resolve: async (parent) => {
          const { TopArtists } = parent;
          if (TopArtists.length > 0) {
            const TopArtistsData = await GetMyTopArtists(TopArtistsList);
            return TopArtistsData;
          }
          return [];
        },
      },

      Podcasts: { type: new GraphQLList(GraphQLString) },
    };
  },
});

export const PodcastSchema = new GraphQLObjectType({
  name: "PodcastSchema",
  fields: () => {
    return {
      PodcastImage: { type: GraphQLString },

      Name: { type: GraphQLString },

      Description: { type: GraphQLString },

      VideoID: { type: GraphQLString },

      HostName: { type: GraphQLString },

      HostID: { type: GraphQLString },

      Playbacks: { type: GraphQLInt },
    };
  },
});

export const TrendingSchema = new GraphQLObjectType({
  name: "TrendingSchema",
  fields: () => {
    return {
      PodcastID: { type: GraphQLID },
      
      PodcastData: {
        type: PodcastSchema,
        resolve: (parent) => {
          const { PodcastID } = parent;
          const PodcastData = await GetPodcastData(PodcastID);
        },
      },
    };
  },
});