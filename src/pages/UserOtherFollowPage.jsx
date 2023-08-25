import React from 'react'
import MainContainer from "components/Containers/MainContainer";
import LeftContainer from "components/Containers/LeftContainer";
import MiddleContainer from "components/Containers/MiddleContainer";
import RightContainer from "components/Containers/RightContainer";
import LeftNavBar from "components/LeftNavBar/LeftNavBar";
import MiddleInfo from "components/MiddleInfo/MiddleInfo";
import RightBanner from "components/RightBanner/RightBanner";
import UserOtherFollowPageInfo from "components/UserOtherFollowPageInfo/UserOtherFollowPageInfo";
const UserOtherFollowPage = () => {
  return (
    <MainContainer>
      <LeftContainer>
        <LeftNavBar />
      </LeftContainer>
      <MiddleContainer>
        <MiddleInfo>
          <UserOtherFollowPageInfo />
        </MiddleInfo>
      </MiddleContainer>
      <RightContainer>
        <RightBanner />
      </RightContainer>
    </MainContainer>
  );
}

export default UserOtherFollowPage