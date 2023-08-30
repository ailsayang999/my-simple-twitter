import React, { useContext, useState, useEffect } from "react";
import "./userSelfFollowPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import { followingDummyData } from "api/tweets";
import ModalContext from "context/ModalContext";
// 引入Modal元件
import PostTweetModal from "components/PostTweetModal/PostTweetModal";
import { getUserSelfFollower, getUserSelfFollowing } from "api/tweets";

const FollowerContent = ({ follower, handleFollowerBtnClick }) => {
  // backendUserSelfFollower裡面還有一層
  return (
    <>
      {follower.map(({ isFollowed, follower, followerId }) => {
        return (
          <div className="follower-item-container" key={followerId}>
            <div className="follower-content">
              <div className="follower-avatar-container">
                <img src={follower.avatar} alt="" className="follower-avatar" />
              </div>

              <div className="follower-name-follow-btn-intro">
                <div className="follower-name-btn-container">
                  <div className="follower-name">{follower.name}</div>

                  <button
                    className={`${isFollowed ? "following-btn" : "follow-btn"}`}
                    onClick={() =>
                      handleFollowerBtnClick(followerId, isFollowed)
                    }
                  >
                    {isFollowed ? "正在跟隨" : "跟隨"}
                  </button>
                </div>
                <div className="follower-intro">{follower.introduction}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const FollowingContent = ({ following, handleFollowingBtnClick }) => {
  return (
    <>
      {following.map(({ id, name, avatar, isFollowed, intro }) => {
        return (
          <div className="follower-item-container" key={id}>
            <div className="follower-content">
              <div className="follower-avatar-container">
                <img src={avatar} alt="" className="follower-avatar" />
              </div>

              <div className="follower-name-follow-btn-intro">
                <div className="follower-name-btn-container">
                  <div className="follower-name">{name}</div>

                  <button
                    className={`${isFollowed ? "following-btn" : "follow-btn"}`}
                    onClick={() => {
                      handleFollowingBtnClick(id);
                    }}
                  >
                    {isFollowed ? "正在跟隨" : "跟隨"}
                  </button>
                </div>
                <div className="follower-intro">{intro}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const UserSelfFellowPageInfo = () => {
  const navigate = useNavigate();
  //如果點按返回箭頭就navigate to /user/self
  const handleBackArrowClick = () => {
    navigate("/user/self");
  };

  // 把要傳給PostTweetModal的props都引入進來
  const { postModal, inputValue, handleTweetTextAreaChange, handleAddTweet } =
    useContext(ModalContext);

  /////////////////////////////////////// 畫面顯示決定區///////////////////////////////////////

  // 先從 localStorage 拿在 UserSelfPage 在handleNavigateToFollowingPage時存在localStorage的 pageShowFollowContent 當作渲染畫面的初始值
  const pageShowFollowContent = localStorage.getItem("pageShowFollowContent");

  // 把pageShowFollowContent設為showFollowPageContent的初始值
  const [showFollowPageContent, setShowFollowPageContent] = useState(
    pageShowFollowContent
  );
  console.log(showFollowPageContent);
  // 頁內切換FollowerContent || FollowingContent
  const handleFollowerClick = (followerValue) => {
    setShowFollowPageContent(followerValue);
    console.log(showFollowPageContent);
  };
  // 頁內切換FollowerContent || FollowingContent
  const handleFollowingClick = (followingValue) => {
    setShowFollowPageContent(followingValue);
    console.log(showFollowPageContent);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleFollowerBtnClick = (followerId, isFollowed) => {
    console.log("follower in handleFollowerClick", follower);
    
    setFollower(
      follower.map((personObj) => {
        if (personObj.followerId === followerId) {
          return { ...personObj, isFollowed: !isFollowed };
        } else {
          return personObj;
        }
      })
    );
  };

  const handleFollowingBtnClick = (id) => {
    setFollowing(following.filter((fol) => fol.id !== id));
  };


  ///////////////////////////////////////////////////初始畫面渲染 /////////////////////////////////////////////////
  const [userInfo, setUserInfo] = useState([]); //在每一頁的useEffect中會去向後端請求登入者的object資料
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState(followingDummyData);
  useEffect(() => {
    console.log("execute User Self Follow Page function in useEffect");
    // //首先拿到當前登入的使用者資料
    const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
    const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
    const userInfoId = LocalStorageUserInfo.id; //再從這個object拿到登入者的id

    const getUserSelfFollowerAsync = async () => {
      try {
        const backendUserSelfFollower = await getUserSelfFollower(userInfoId);
        setFollower(backendUserSelfFollower);
      } catch (error) {
        console.error(error);
      }
    };

    const getUserSelfFollowingAsync = async () => {
      try {
        const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
        const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
        const userInfoId = LocalStorageUserInfo.id; //再從這個object拿到登入者的id
        const backendUserSelfFollowing = await getUserSelfFollowing(userInfoId);
        console.log("backendUserSelfFollower:", backendUserSelfFollowing);
        //後端好了再打開，先用userInfo
        setFollowing(backendUserSelfFollowing);
      } catch (error) {
        console.error(error);
      }
    };

    // getUserInfoAsync();
    getUserSelfFollowerAsync();
    getUserSelfFollowingAsync();
  }, []);

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
            showFollowPageContent === "follower" ? "follow-navigate-active" : ""
          }`}
          value="follower"
          onClick={(e) => {
            handleFollowerClick(e.target.value);
          }}
        >
          追隨者
        </button>
        <button
          className={`user-self-following ${
            showFollowPageContent === "following"
              ? "follow-navigate-active"
              : ""
          }`}
          value="following"
          onClick={(e) => handleFollowingClick(e.target.value)}
        >
          正在追隨
        </button>
      </div>

      {showFollowPageContent === "follower" && (
        <FollowerContent
          follower={follower}
          handleFollowerBtnClick={handleFollowerBtnClick}
        />
      )}

      {/* Render Follower */}
      {showFollowPageContent === "following" && ( 
        <FollowingContent
          following={following}
          handleFollowingBtnClick={handleFollowingBtnClick}
        />
      )}

      {/* Modal ：根據postModal的布林值決定是否要跳出PostTweetModal component*/}
      {postModal && (
        <PostTweetModal
          userInfo={userInfo}
          inputValue={inputValue}
          onTweetTextAreaChange={handleTweetTextAreaChange}
          onAddTweet={handleAddTweet}
          userAvatar={userInfo.avatar}
        />
      )}
    </div>
  );
};

export default UserSelfFellowPageInfo;
