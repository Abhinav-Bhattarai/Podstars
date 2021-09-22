import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React, { useState } from "react";
import MainContainer from "../Components/MainContainer/main-container";
import SidebarContainer, {
  SidebarHeader,
  NavigatorContainer,
  IconContainer,
} from "../Components/Sidebar/sidebar";
import {
  GetFavoraites,
  GetLivePodcasts,
  GetTrendingPodcasts,
} from "../GraphQL/query";
import { AiFillHome, AiOutlineSearch, AiFillHeart } from "react-icons/ai";

interface Podcasts {
  name: string;
  host: string;
  photo: string;
}

interface Podstars {
  photo: string;
  name: string;
}

const Home: NextPage<{ authStatus: boolean }> = ({ authStatus }) => {
  const [trending, setTrending] = useState<null | Array<Podcasts>>(null);
  const [live, setLive] = useState<null | Array<Podcasts>>(null);
  const [topStars, setTopStars] = useState<null | Array<Podstars>>(null);
  //   const Trending = useQuery(GetTrendingPodcasts);
  //   const LivePodcasts = useQuery(GetLivePodcasts);
  //   const Favoraites = useQuery(GetFavoraites);

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
                <AiFillHeart/>
            </IconContainer>
        </NavigatorContainer>
      </SidebarContainer>
      <MainContainer></MainContainer>
    </React.Fragment>
  );
};

export default Home;
