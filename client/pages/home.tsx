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

const SkeletonCardContainer: Array<any> = [];
for (let i = 0; i < 6; i++) {
  SkeletonCardContainer.push(<SkeletonCard key={i} />);
}

const Home: NextPage<PageProps> = ({ authStatus, storage }) => {
  const [trending, setTrending] = useState<null | Array<Podcasts>>(null);
  const [favoraiteArtists, setfavoraiteArtists] = useState<null | Array<Podstars>>(null);
  const [favoraitePodcasts, setFavoraitePodcasts] = useState<null | Array<Podcasts>>(null);
  const TrendingQuery = useQuery(GetTrendingPodcasts);
  const favoraiteArtistsQuery = useQuery(GetFavoraiteArtists, {
    onCompleted: () => {},
  });
  const favoraitePodcastsQuery = useQuery(GetFavoraitePodcasts, {
    onCompleted: () => {},
  });

  const TrendingCards = useMemo(() => {
    if (trending) {
      // mapping
    }
    return SkeletonCardContainer;
  }, [trending]);

  const favoraiteArtistsCard = useMemo(() => {
    if (favoraiteArtists) {
    }
    return SkeletonCardContainer;
  }, [favoraiteArtists]);

  const favoraitePodcastsCard = useMemo(() => {
    if (favoraitePodcasts) {
    }
    return SkeletonCardContainer;
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
          name={(storage && authStatus === true) ? storage.userName : "Login To Continue"}
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

