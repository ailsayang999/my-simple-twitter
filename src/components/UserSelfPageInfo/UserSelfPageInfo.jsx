import "./userSelfPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import userSelfInfoCover from "assets/images/fakeUserCover.png";
import userSelfAvatar from "assets/images/fakeUserAvatar.png";

const UserSelfPageInfo = () => {
  const navigate = useNavigate();
  const handleBackArrowClick = () => {
    navigate("/main");
  };

  return (
    <div className="user-self-page-info">
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
      {/* user-self-info-area */}
      <div className="user-self-info-area">
        {/* 以下在EditSelfInfoModal會用到 */}
        <div className="user-self-avatar-cover">
          <div className="user-self-cover-container">
            <img
              src={userSelfInfoCover}
              alt="userSelfCover"
              className="user-self-cover"
            />
          </div>
          <div className="user-self-avatar-container">
            <img src={userSelfAvatar} alt="" className="user-self-avatar" />
          </div>
        </div>

        {/* 個人姓名 */}
        <div className="user-self-name-account-container">
          <h5 className="user-self-name">{"Ailsa Yang"}</h5>
          <span className="user-self-account">@{"ailsa"}</span>
        </div>
        {/* 個人介紹 */}
        <div className="user-self-introduction">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur,
          nulla.
        </div>
        {/* 個人跟隨中和跟隨者 */}
        <div className="user-self-follow-following-container">
          <div className="user-self-follow">
            {34} 個<span className="following-text">跟隨中</span>
          </div>
          <div className="user-self-following">
            {56} 個<span className="follower-text">跟隨者</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelfPageInfo;
