import React from "react";
import { styled } from "styled-components";
import MainContainer from "components/Containers/MainContainer";
import LeftContainer from "components/Containers/LeftContainer";
import MiddleContainer from "components/Containers/MiddleContainer";
import RightContainer from "components/Containers/RightContainer";
import LeftNavBar from "components/LeftNavBar/LeftNavBar";
import MiddleInfo from "components/MiddleInfo/MiddleInfo";
import SettingPageInfo from "components/SettingPageInfo/SettingPageInfo";

const RightBlank = styled.div`
  width: 100%;
  height: 100%;
`;

const SettingPage = () => {
  return (
    <MainContainer>
      <LeftContainer>
        <LeftNavBar />
      </LeftContainer>
      <MiddleContainer>
        <MiddleInfo>
          <SettingPageInfo />
        </MiddleInfo>
      </MiddleContainer>
      <RightContainer>
        <RightBlank />
      </RightContainer>
    </MainContainer>
  );
};

export default SettingPage;
