import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { GraphQLObjectType, GraphQLList, GraphQLSchema } = require("graphql");
import { TrendingModel } from "../Models/trending.js";
import { PodcastSchema } from "./Schema.js";

const RootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    GetTrendingData: {
      type: new GraphQLList(PodcastSchema),
      resolve: async () => {
        const Trending = await TrendingModel.find({});
        const PodcastData = await GetPodcastData(Trending.Podcasts);
        return PodcastData;
      },
    },

    GetTopLivePodcasts: {
        type: new GraphQLList(PodcastSchema),
        resolve: async () => {
          
        }
    }
  },
});

// const Mutation = new GraphQLObjectType({
//   name: "mutation",
// });

export const MainSchema = new GraphQLSchema({
  query: RootQuery,
});
