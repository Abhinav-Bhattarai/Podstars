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
  query ($id: String!, $authStatus: String!, $uid: String!) {
    GetMyFavoraiteArtists(id: $id, authStatus: $authStatus, uid: $uid) {
      Username
      Profile
      Podcasts
    }
  }
`;

export const GetFavoraitePodcasts = gql`
  query ($id: String!, $authStatus: String!, $uid: String!) {
    GetMyFavoraitePodcasts(id: $id, authStatus: $authStatus, uid: $uid) {
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
