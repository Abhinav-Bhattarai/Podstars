import { NextPage } from "next";
import React from "react";
import {
  FunctionsSection,
  LandingPageContextView,
  Navbar,
  NavigatorContainer,
  Title,
  TitleOverview,
} from "../Components/About/reusables";
import Logo from "../Components/UI/logo";

const Index: NextPage = () => {
  return (
    <React.Fragment>
      <Navbar>
        <NavigatorContainer initialFlex={1.4} id='NavigatorContainer1'>
          <Logo/>
        </NavigatorContainer>
        <NavigatorContainer initialFlex={1} id='NavigatorContainer2'>
        
        </NavigatorContainer>
        <NavigatorContainer initialFlex={2} id='NavigatorContainer3'>

        </NavigatorContainer>
      </Navbar>
      <LandingPageContextView backgroundColor="#191a1b">
        <TitleOverview>
          <Title color='#f3f3f3' name='The'/>
          <Title color='rgb(252, 252, 64)' name='Social'/>
          <Title color='#f3f3f3' name='Podcast'/>
        </TitleOverview>
        <FunctionsSection/>
      </LandingPageContextView>
    </React.Fragment>
  );
};

export default Index;
