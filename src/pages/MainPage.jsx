import React from "react";
import MainContainer from "components/Containers/MainContainer";
import LeftContainer from "components/Containers/LeftContainer";
import MiddleContainer from "components/Containers/MiddleContainer";
import RightContainer from "components/Containers/RightContainer";
import LeftNavBar from "components/LeftNavBar/LeftNavBar";
import MainInfo from "components/MainInfo/MainInfo";
import RightBanner from "components/RightBanner/RightBanner";

const MainPage = () => {
  return (
    <MainContainer>
      <LeftContainer><LeftNavBar/></LeftContainer>
      <MiddleContainer><MainInfo/></MiddleContainer>
      <RightContainer><RightBanner/></RightContainer>
    </MainContainer>
  );
};

export default MainPage;
