import { NextPage } from "next";
import React from "react";
import { AiFillHeart, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import MainContainer, {
  MainViewHeader,
} from "../Components/MainContainer/main-container";
import SidebarContainer, {
  IconContainer,
  SidebarHeader,
  NavigatorContainer,
} from "../Components/Sidebar/sidebar";
import { PageProps } from "../Interfaces/interface";

const Search: NextPage<PageProps> = ({ storage, authStatus }) => {
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
      </MainContainer>
    </React.Fragment>
  );
};

export default Search;
