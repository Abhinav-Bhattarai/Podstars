import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { AiFillHeart, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import MainContainer, {
  MainViewHeader,
} from "../Components/MainContainer/main-container";
import SidebarContainer, {
  IconContainer,
  SidebarHeader,
  NavigatorContainer,
} from "../Components/Sidebar/sidebar";
import Spinner from "../Components/UI/spinner";
import useAuthorizationCheck from "../Hooks/useAuthorizationCheck";
import { PageProps } from "../Interfaces/interface";

const Profile: NextPage<PageProps> = ({ storage }) => {
  const { auth_status } = useAuthorizationCheck();
  const router = useRouter();

  useEffect(() => {
    if (auth_status === false) {
      router.replace("/l/login");
    }
  }, [router, auth_status]);

  let ProfileContent = () => {
    return (
      <div
        style={{
          width: "90%",
          height: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </div>
    );
  };

  if (auth_status !== null) {
  }

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
        <ProfileContent />
      </MainContainer>
    </React.Fragment>
  );
};

export default Profile;
