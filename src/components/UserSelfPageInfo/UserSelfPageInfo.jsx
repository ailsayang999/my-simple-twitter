import "./userSelfPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";

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
          <div className="tweet-amount">25 <span className="tweet-amount-text">推文</span></div>
        </div>
      </div>
    </div>
  );
}

export default UserSelfPageInfo