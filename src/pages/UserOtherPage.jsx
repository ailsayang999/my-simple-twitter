import React from "react";
import MainContainer from "components/Containers/MainContainer";
import LeftContainer from "components/Containers/LeftContainer";
import MiddleContainer from "components/Containers/MiddleContainer";
import RightContainer from "components/Containers/RightContainer";
import LeftNavBar from "components/LeftNavBar/LeftNavBar";
import MiddleInfo from "components/MiddleInfo/MiddleInfo";
import RightBanner from "components/RightBanner/RightBanner";
import UserOtherPageInfo from "components/UserOtherPageInfo/UserOtherPageInfo";

import { NavigationContextProvider } from "context/NavigationContext";
// 因為NavigationContextProvider裡面的navigate是react-router-dom套件的函式，只能在router裡使用
const UserOtherPage = () => {
  return (
    <MainContainer>
      <LeftContainer>
        <LeftNavBar />
      </LeftContainer>
      <MiddleContainer>
        <MiddleInfo>
          <NavigationContextProvider>
            <UserOtherPageInfo />
          </NavigationContextProvider>
        </MiddleInfo>
      </MiddleContainer>
      <RightContainer>
        <RightBanner />
      </RightContainer>
    </MainContainer>
  );
};

export default UserOtherPage;
