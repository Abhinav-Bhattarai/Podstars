import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React, { useMemo, useState } from "react";
import MainContainer, {
  CardContainer,
  CardContainerNameType,
  MainViewHeader,
  ScrollView,
} from "../Components/MainContainer/main-container";
import SidebarContainer, {
  SidebarHeader,
  NavigatorContainer,
  IconContainer,
} from "../Components/Sidebar/sidebar";
import {
  GetFavoraiteArtists,
  GetFavoraitePodcasts,
  GetTrendingPodcasts,
} from "../GraphQL/query";
import { AiFillHome, AiOutlineSearch, AiFillHeart } from "react-icons/ai";
import { PageProps, Podstars } from "../Interfaces/interface";
import SkeletonCard from "../Components/UI/skeleton-card";

interface Podcasts {
  name: string;
  host: string;
  photo: string;
}

const GetSkeletonCards = () => {
  const CardContainer = [];
  for (let i = 0; i < 6; i++) {
    CardContainer.push(<SkeletonCard key={i} />);
  }
  return CardContainer;
};

const Home: NextPage<PageProps> = ({ authStatus, storage }) => {
  const [trending, setTrending] = useState<null | Array<Podcasts>>(null);
  const [favoraiteArtists, setfavoraiteArtists] = useState<null | Array<Podstars>>(null);
  const [favoraitePodcasts, setFavoraitePodcasts] = useState<null | Array<Podcasts>>(null);
  const TrendingQuery = useQuery(GetTrendingPodcasts);
  const favoraiteArtistsQuery = useQuery(GetFavoraiteArtists, {
    variables: {
      userID: storage ? storage.userID : "",
      authToken: storage ? storage.authToken : "",
      uid: storage ? storage.uid : "",
    },

    onCompleted: () => {},
  });
  const favoraitePodcastsQuery = useQuery(GetFavoraitePodcasts, {
    variables: {
      userID: storage ? storage.userID : "",
      authToken: storage ? storage.authToken : "",
      uid: storage ? storage.uid : "",
    },
    onCompleted: () => {},
  });

  const TrendingCards = useMemo(() => {
    if (trending) {
      // mapping
    }
    return GetSkeletonCards();
  }, [trending]);

  const favoraiteArtistsCard = useMemo(() => {
    if (favoraiteArtists) {
    }
    return GetSkeletonCards();
  }, [favoraiteArtists]);

  const favoraitePodcastsCard = useMemo(() => {
    if (favoraitePodcasts) {
    }
    return GetSkeletonCards();
  }, [favoraitePodcasts]);

  return (
    <React.Fragment>
      <SidebarContainer>
        <SidebarHeader name="Podstars" />

        <NavigatorContainer name="Home">
          <IconContainer>
            <AiFillHome />
          </IconContainer>
        </NavigatorContainer>

        <NavigatorContainer name="Search">
          <IconContainer>
            <AiOutlineSearch />
          </IconContainer>
        </NavigatorContainer>

        <NavigatorContainer name="Liked Podcasts">
          <IconContainer>
            <AiFillHeart />
          </IconContainer>
        </NavigatorContainer>
      </SidebarContainer>

      <MainContainer>
        <MainViewHeader
          name={storage ? storage.userName : "Abhinav Bhattarai"}
        />
        <ScrollView>
          <CardContainerNameType name="Currently Trending" />
          <CardContainer>{TrendingCards}</CardContainer>

          <CardContainerNameType name="Your Favoraite Artists" />
          <CardContainer>{favoraiteArtistsCard}</CardContainer>

          <CardContainerNameType name="Your Favoraite Podcasts" />
          <CardContainer>{favoraitePodcastsCard}</CardContainer>
        </ScrollView>
      </MainContainer>
    </React.Fragment>
  );
};

export default Home;
