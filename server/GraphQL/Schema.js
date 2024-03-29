import { createRequire } from "module";
import { GetMyTopArtists } from "./query-helper.js";
const require = createRequire(import.meta.url);
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} = require("graphql");

export const UserSchema = new GraphQLObjectType({
  name: "UserSchema",
  fields: () => {
    return {
      _id: { type: GraphQLString },

      Username: { type: GraphQLString },

      Email: { type: GraphQLString },

      Profile: { type: GraphQLString },

      FavoraitesList: {
        type: UserSchema,
        resolve: async (parent) => {
          const { Favoraites } = parent;
          if (Favoraites.length > 0) {
            const TopArtistsData = await GetMyTopArtists(TopArtistsList);
            return TopArtistsData;
          }
          return [];
        },
      },

      Podcasts: { type: new GraphQLList(GraphQLString) },

      ProfileAuthorization: { type: GraphQLBoolean}
    };
  },
});

export const PodcastSchema = new GraphQLObjectType({
  name: "PodcastSchema",
  fields: () => {
    return {
      _id: { type: GraphQLString },

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
