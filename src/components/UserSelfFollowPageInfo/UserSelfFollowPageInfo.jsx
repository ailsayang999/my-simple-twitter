import React, { useContext, useState, useEffect } from "react";
import "./userSelfFollowPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import ModalContext from "context/ModalContext";
import UserInfoContext from "context/UserInfoContext";
import { useAuth } from "context/AuthContext"; //到AuthContext拿是否已驗證;
import FollowContext from "context/FollowContext";
// 引入Modal元件
import PostTweetModal from "components/PostTweetModal/PostTweetModal";
import {
  getUserInfo,
  getUserSelfFollower,
  getUserSelfFollowing,
  postFollowShip,
  deleteFollowShip,
} from "api/tweets";

const ShowEmptyFollower = () => {
  return <div className="empty-user-self-follow-page">尚無追蹤者</div>;
};
const ShowEmptyFollowing = () => {
  return <div className="empty-user-self-follow-page">尚無正在追蹤</div>;
};

const FollowerContent = ({ follower, handleFollowBtnClick }) => {
  // console.log("render followerContent");
  // backendUserSelfFollower裡面還有一層
  return (
    <>
      {follower.length === 0 && <ShowEmptyFollower />}
      {follower.length > 0 &&
        follower?.map(({ isFollowed, follower, followerId }) => {
          return (
            <div className="follower-item-container" key={followerId}>
              <div className="follower-content">
                <div className="follower-avatar-container">
                  <img
                    src={follower.avatar}
                    alt=""
                    className="follower-avatar"
                  />
                </div>

                <div className="follower-name-follow-btn-intro">
                  <div className="follower-name-btn-container">
                    <div className="follower-name">{follower.name}</div>

                    <button
                      className={`${
                        isFollowed ? "following-btn" : "follow-btn"
                      }`}
                      onClick={() =>
                        handleFollowBtnClick(followerId, isFollowed)
                      }
                    >
                      {isFollowed ? "正在跟隨" : "跟隨"}
                    </button>
                  </div>
                  <div className="follower-intro">
                    {follower.introduction === "null"
                      ? ""
                      : follower.introduction}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

const FollowingContent = ({ following, handleFollowBtnClick }) => {
  return (
    <>
      {following.length === 0 && <ShowEmptyFollowing />}
      {following.length > 0 &&
        following?.map(({ followingId, following, isFollowed }) => {
          return (
            <div className="follower-item-container" key={followingId}>
              <div className="follower-content">
                <div className="follower-avatar-container">
                  <img
                    src={following.avatar}
                    alt=""
                    className="follower-avatar"
                  />
                </div>

                <div className="follower-name-follow-btn-intro">
                  <div className="follower-name-btn-container">
                    <div className="follower-name">{following.name}</div>

                    <button
                      className={`${
                        isFollowed ? "following-btn" : "follow-btn"
                      }`}
                      onClick={() => {
                        handleFollowBtnClick(followingId, isFollowed);
                      }}
                    >
                      {isFollowed ? "正在跟隨" : "跟隨"}
                    </button>
                  </div>
                  <div className="follower-intro">
                    {following.introduction === "null"
                      ? ""
                      : following.introduction}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

const UserSelfFellowPageInfo = () => {
  //先從AuthContext拿到驗證是否為true(isAuthenticated:true)
  const { isAuthenticated } = useAuth();

  //先從UserInfoContext拿到驗證是否為userInfo
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();
  //如果點按返回箭頭就navigate to /user/self
  const handleBackArrowClick = () => {
    navigate("/user/self");
  };
  // 把要傳給follow的state都引入進來
  const {
    follower,
    setFollower,
    following,
    setFollowing,
    handleFollowBtnClick,
  } = useContext(FollowContext);

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
  // console.log(showFollowPageContent);
  // 頁內切換FollowerContent || FollowingContent
  const handleFollowerClick = (followerValue) => {
    setShowFollowPageContent(followerValue);
    // console.log(showFollowPageContent);
  };
  // 頁內切換FollowerContent || FollowingContent
  const handleFollowingClick = (followingValue) => {
    setShowFollowPageContent(followingValue);
    // console.log(showFollowPageContent);
  };

  ///////////////////////////////////////////////////初始畫面渲染 /////////////////////////////////////////////////
  const localStorageUserObjectString = localStorage.getItem(
    "UserInfoObjectString"
  );
  const userInfoObject = JSON.parse(localStorageUserObjectString);
  // console.log("userInfoObject", userInfoObject);

  useEffect(() => {
    // console.log("execute User Self Follow Page function in useEffect");
    //  驗證沒有成功的話
    if (!isAuthenticated) {
      // 頁面跳轉到login頁面
      navigate("/login");
    }
    setUserInfo(userInfoObject);

    const getUserSelfFollowerAsync = async () => {
      try {
        const backendUserSelfFollower = await getUserSelfFollower(
          userInfoObject.id
        );
        backendUserSelfFollower.sort((a, b) => {
          const dateA = new Date(a.follower.Followship.createdAt);
          const dateB = new Date(b.follower.Followship.createdAt);
          return dateB - dateA; // 降序排序
        });
        setFollower(backendUserSelfFollower);
      } catch (error) {
        console.error(error);
      }
    };

    const getUserSelfFollowingAsync = async () => {
      try {
        const backendUserSelfFollowing = await getUserSelfFollowing(
          userInfoObject.id
        );
        backendUserSelfFollowing.sort((a, b) => {
          const dateA = new Date(a.following.Followship.createdAt);
          const dateB = new Date(b.following.Followship.createdAt);
          return dateB - dateA; // 降序排序
        });
        //後端好了再打開，先用userInfo
        setFollowing(backendUserSelfFollowing);
      } catch (error) {
        console.error(error);
      }
    };
    getUserSelfFollowerAsync();
    getUserSelfFollowingAsync();
  }, []);

  // console.log("follow page follower: ", follower);

  return (
    <div className="user-self-follow-page-info">
      {/* 以下header UserSelfPage, UserOtherPage UserSelfFollowPage, UserOtherFollowPage 可以重複使用 */}
      <div className="header-container">
        <BackArrowIcon
          className="back-arrow-icon"
          onClick={handleBackArrowClick}
        />

        <div className="name-tweet-amount-container">
          <h5 className="header-title-user-self-name">{userInfoObject.name}</h5>
          <div className="tweet-amount">
            {userInfoObject.tweetCount}
            <span className="tweet-amount-text">推文</span>
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
          handleFollowBtnClick={handleFollowBtnClick}
        />
      )}

      {/* Render Follower */}
      {showFollowPageContent === "following" && (
        <FollowingContent
          following={following}
          handleFollowBtnClick={handleFollowBtnClick}
        />
      )}

      {/* Modal ：根據postModal的布林值決定是否要跳出PostTweetModal component*/}
      {postModal && (
        <PostTweetModal
          userInfo={userInfoObject}
          inputValue={inputValue}
          onTweetTextAreaChange={handleTweetTextAreaChange}
          onAddTweet={handleAddTweet}
          userAvatar={userInfoObject.avatar}
        />
      )}
    </div>
  );
};

export default UserSelfFellowPageInfo;
