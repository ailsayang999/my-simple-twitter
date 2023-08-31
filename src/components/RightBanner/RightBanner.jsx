import "./rightBanner.scss";
import { useEffect, useContext } from "react";
import { getTop10 } from "api/tweets";
import FollowContext from "context/FollowContext";



const RecommendTopUserItems = ({ topUserArr, handleFollowBtnClick }) => {
  return (
    <div className="recommend-top-user-items">
      {topUserArr.map(({ id, name, account, avatar, isFollowed }) => {
        return (
          <div className="userTop-item-container" id={id}>
            <div className="userTop-item">
              <div className="user-top-avatar-container">
                <img src={avatar} alt="" className="top10-avatar" />
              </div>

              <div className="userTop-name-account">
                <div className="user-top-name">{name}</div>
                <div className="user-top-account">@{account}</div>
              </div>
              <div className="follow-btn-container">
                <button
                  className={`${isFollowed ? "following-btn" : "follow-btn"}`}
                  onClick={() => {
                    handleFollowBtnClick(id, isFollowed);
                  }}
                >
                  {isFollowed ? "正在跟隨" : "跟隨"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const RightBanner = () => {
  // 把要傳給follow的state都引入進來
  const {
    topUserArr,
    setTopUserArr,
    handleFollowBtnClick,
  } = useContext(FollowContext);

  useEffect(() => {
    console.log("execute right banner function in useEffect");
    const getTop10Async = async () => {
      try {
        const backendTop10 = await getTop10();
        setTopUserArr(backendTop10.top10UsersWithFollowStatus);
      } catch (error) {
        console.error(error);
      }
    };
    getTop10Async();
  }, []);


  return (
    <div className="right-banner">
      <h4 className="right-banner-title">推薦跟隨</h4>
      <RecommendTopUserItems
        topUserArr={topUserArr}
        handleFollowBtnClick={handleFollowBtnClick}
      />
    </div>
  );
};

export default RightBanner;
