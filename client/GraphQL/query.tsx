import { gql } from "@apollo/client";

export const GetTrendingPodcasts = gql`
  query {
    GetTrendingData {
      _id
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
      _id
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
      _id
      Username
      Profile
      Podcasts
    }
  }
`;

export const GetFavoraitePodcasts = gql`
  query {
    GetMyFavoraitePodcasts {
      _id
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

export const GetProfileInformation = gql`
  query ($userID: String) {
    GetProfileData(userID: $userID) {
      _id
      Username
      Profile
      Podcasts
    }
  }
`;
