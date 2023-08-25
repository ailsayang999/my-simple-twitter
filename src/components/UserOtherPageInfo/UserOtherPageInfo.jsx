import "./userOtherPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import userOtherInfoCover from "assets/images/fakeUserOtherCover.png";
import userOtherAvatar from "assets/images/fakeUserOtherAvatar.png"

const UserOtherPageInfo = () => {
  const navigate = useNavigate();
  const handleBackArrowClick = () => {
    navigate("/main");
  };
  return (
    <div className="user-other-page-info">
      {/* 以下header UserSelfPage, UserOtherPage UserSelfFollowPage, UserOtherFollowPage 可以重複使用 */}
      <div className="header-container">
        <BackArrowIcon
          className="back-arrow-icon"
          onClick={handleBackArrowClick}
        />

        <div className="name-tweet-amount-container">
          <h5 className="header-title-user-other-name">{"Peter"}</h5>
          <div className="tweet-amount">
            90 <span className="tweet-amount-text">推文</span>
          </div>
        </div>
      </div>

      {/* user-other-info-area */}
      <div className="user-other-info-area">
        {/* 以下在EditSelfInfoModal會用到 */}
        <div className="user-other-avatar-cover">
          <div className="user-other-cover-container">
            <img
              src={userOtherInfoCover}
              alt="userOtherCover"
              className="user-other-cover"
            />
          </div>
          <div className="user-other-avatar-container">
            <img src={userOtherAvatar} alt="" className="user-other-avatar" />
          </div>
        </div>

        {/* 個人姓名 */}
        <div className="user-other-name-account-container">
          <h5 className="user-other-name">{"Peter Lu"}</h5>
          <span className="user-other-account">@{"peter"}</span>
        </div>
        {/* 個人介紹 */}
        <div className="user-other-introduction">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur,
          nulla.
        </div>
        {/* 個人跟隨中和跟隨者 */}
        <div className="user-other-follow-following-container">
          <div className="user-other-follow">
            {77} 個<span className="following-text">跟隨中</span>
          </div>
          <div className="user-other-following">
            {99} 個<span className="follower-text">跟隨者</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOtherPageInfo;
