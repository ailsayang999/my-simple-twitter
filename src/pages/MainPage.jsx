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
  return (
    <MainContainer>
      <LeftContainer>
        <LeftNavBar />
      </LeftContainer>
      <MiddleContainer>
        <MiddleInfo>
          <MainPageInfo/>
        </MiddleInfo>
      </MiddleContainer>
      <RightContainer>
        <RightBanner />
      </RightContainer>
    </MainContainer>
  );
};

export default MainPage;
