import React from 'react'
import MainContainer from "components/Containers/MainContainer";
import LeftContainer from "components/Containers/LeftContainer";
import MiddleContainer from "components/Containers/MiddleContainer";
import RightContainer from "components/Containers/RightContainer";
import LeftNavBar from "components/LeftNavBar/LeftNavBar";
import MiddleInfo from "components/MiddleInfo/MiddleInfo";
import RightBanner from "components/RightBanner/RightBanner";
import UserSelfFollowPageInfo from "components/UserSelfFollowPageInfo/UserSelfFollowPageInfo";
import { NavigationContextProvider } from "context/NavigationContext";
// 因為NavigationContextProvider裡面的navigate是react-router-dom套件的函式，只能在router裡使用

const UserSelfFollowPage = () => {
  return (
    <div>
      <MainContainer>
        <LeftContainer>
          <LeftNavBar />
        </LeftContainer>
        <MiddleContainer>
          <MiddleInfo>
            <NavigationContextProvider>
              <UserSelfFollowPageInfo />
            </NavigationContextProvider>
          </MiddleInfo>
        </MiddleContainer>
        <RightContainer>
          <RightBanner />
        </RightContainer>
      </MainContainer>
    </div>
  );
}

export default UserSelfFollowPage