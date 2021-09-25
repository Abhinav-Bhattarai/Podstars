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
  query ($userID: String!, $authToken: String!, $uid: String!) {
    GetMyFavoraiteArtists(userID: $userID, authToken: $authToken, uid: $uid) {
      Username
      Profile
      Podcasts
    }
  }
`;

export const GetFavoraitePodcasts = gql`
  query ($userID: String!, $authToken: String!, $uid: String!) {
    GetMyFavoraitePodcasts(userID: $userID, authToken: $authToken, uid: $uid) {
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
