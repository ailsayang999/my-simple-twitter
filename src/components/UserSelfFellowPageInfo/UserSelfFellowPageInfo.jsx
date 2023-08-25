import React from "react";
import "./userSelfFellowPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import NavigationContext from "context/NavigationContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const UserSelfFellowPageInfo = () => {
  const navigate = useNavigate();
  const handleBackArrowClick = () => {
    navigate("/user/self");
  };
  // 從Context中拿取setFollowContent的function
  const { followContent } = useContext(NavigationContext);
  console.log(followContent);

  return (
    <div className="user-self-follow-page-info">
      {/* 以下header UserSelfPage, UserOtherPage UserSelfFollowPage, UserOtherFollowPage 可以重複使用 */}
      <div className="header-container">
        <BackArrowIcon
          className="back-arrow-icon"
          onClick={handleBackArrowClick}
        />

        <div className="name-tweet-amount-container">
          <h5 className="header-title-user-self-name">{"Ailsa Yang"}</h5>
          <div className="tweet-amount">
            25 <span className="tweet-amount-text">推文</span>
          </div>
        </div>
      </div>
      {/* user-self-follower-following-like-navigator */}
      <div className="user-self-follow-follower-following-navigator">
        <button
          className={`user-self-follower ${
            followContent === "follower" ? "navigate-active" : ""
          }`}
          value="follower"
          // onClick={(e) => handleChangeUserSelfContent(e.target.value)}
        >
          追隨者
        </button>
        <button
          className={`user-self-following ${
            followContent === "following" ? "navigate-active" : ""
          }`}
          value="following"
          // onClick={(e) => handleChangeUserSelfContent(e.target.value)}
        >
          正在追蹤
        </button>
      </div>
    </div>
  );
};

export default UserSelfFellowPageInfo;
