import MainContainer from "components/Containers/MainContainer";
import LeftContainer from "components/Containers/LeftContainer";
import MiddleContainer from "components/Containers/MiddleContainer";
import RightContainer from "components/Containers/RightContainer";
import LeftNavBar from "components/LeftNavBar/LeftNavBar";
import MiddleInfo from "components/MiddleInfo/MiddleInfo";
import RightBanner from "components/RightBanner/RightBanner";

// ReplyPageInfo裡面的資訊是 ReplyPage的 MiddleInfo主要內容
import ReplyPageInfo from "components/ReplyPageInfo/ReplyPageInfo";

const ReplyPage = () => {
  return (
    <MainContainer>
      <LeftContainer>
        <LeftNavBar />
      </LeftContainer>
      <MiddleContainer>
        <MiddleInfo>
          <ReplyPageInfo />
        </MiddleInfo>
      </MiddleContainer>
      <RightContainer>
        <RightBanner />
      </RightContainer>
    </MainContainer>
  );
};

export default ReplyPage;
