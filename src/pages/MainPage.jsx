import { useState } from "react";
import MainContainer from "components/Containers/MainContainer";
import LeftContainer from "components/Containers/LeftContainer";
import MiddleContainer from "components/Containers/MiddleContainer";
import RightContainer from "components/Containers/RightContainer";
import LeftNavBar from "components/LeftNavBar/LeftNavBar";
import MiddleInfo from "components/MiddleInfo/MiddleInfo";
import RightBanner from "components/RightBanner/RightBanner";

// MainPageInfo裡面的資訊是 MainPage的 MiddleInfo主要內容
import MainPageInfo from "components/MainPageInfo/MainPageInfo";

const MainPage = () => {
  //postModal的boolean判斷是否要跳出postTweetModal
  const [postModal, setPostModal] = useState(false);

  const togglePostModal = () => {
    setPostModal(!postModal);
  };

  return (
    <MainContainer>
      <LeftContainer>
        <LeftNavBar togglePostModal={togglePostModal} />
      </LeftContainer>
      <MiddleContainer>
        <MiddleInfo>
          <MainPageInfo
            postModal={postModal}
            togglePostModal={togglePostModal}
          />
        </MiddleInfo>
      </MiddleContainer>
      <RightContainer>
        <RightBanner />
      </RightContainer>
    </MainContainer>
  );
};

export default MainPage;
