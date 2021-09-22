import { gql } from "@apollo/client";

export const GetTrendingPodcasts = gql`
  query {
    GetTrendingData {
      PodcastImage
      Name
      Description
      VideoID
      HostName
      HostID
      Playbacks
    }
  }
`;

export const GetLivePodcasts = gql`
  query {
    GetLivePodcasts {
      PodcastImage
      Name
      Description
      VideoID
      HostName
      HostID
      Playbacks
    }
  }
`;

export const GetFavoraites = gql`
  query($id: String!, $) {
    GetMyFavoraites {
        Username
        Profile
        Podcasts
    }
  }
`;
