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

export const GetFavoraiteArtists = gql`
  query {
    GetMyFavoraiteArtists {
      Username
      Profile
      Podcasts
    }
  }
`;

export const GetFavoraitePodcasts = gql`
  query {
    GetMyFavoraitePodcasts {
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
