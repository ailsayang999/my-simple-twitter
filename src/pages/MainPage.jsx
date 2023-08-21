import React from "react";
import MainContainer from "components/Containers/MainContainer";
import LeftContainer from "components/Containers/LeftContainer";
import MiddleContainer from "components/Containers/MiddleContainer";
import RightContainer from "components/Containers/RightContainer";

const MainPage = () => {
  return (
    <MainContainer>
      <LeftContainer>Left</LeftContainer>

      <MiddleContainer>Middle</MiddleContainer>

      <RightContainer>Right</RightContainer>
    </MainContainer>
  );
};

export default MainPage;
