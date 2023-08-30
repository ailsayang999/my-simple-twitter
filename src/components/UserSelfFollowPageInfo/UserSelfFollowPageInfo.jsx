import React, { useContext, useState, useEffect } from "react";
import "./userSelfFollowPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import ModalContext from "context/ModalContext";
// 引入Modal元件
import PostTweetModal from "components/PostTweetModal/PostTweetModal";
import {
  getUserInfo,
  getUserSelfFollower,
  getUserSelfFollowing,
  postFollowShip,
  deleteFollowShip,
} from "api/tweets";

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
      {following.map(({ followingId, following , isFollowed}) => {
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
                    className={`${isFollowed ? "following-btn" : "follow-btn"}`}
                    onClick={() => {
                      handleFollowingBtnClick(followingId);
                    }}
                  >
                    {isFollowed ? "正在跟隨" : "跟隨"}
                  </button>
                </div>
                <div className="follower-intro">{following.introduction}</div>
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
  const handleFollowerBtnClick = async (followerId, isFollowed) => {
    console.log("follower in handleFollowerClick", follower);
    console.log("follower id", followerId);
    const followPayload = {
      id: followerId,
    };
    console.log("followPayload", followPayload);

    // 想追蹤這個follower
    if (isFollowed === false) {
      const res = await postFollowShip(followPayload);
      console.log("後端傳來postFollowShip的結果", res);
      //如果有追蹤成功的話就：
      if (res) {
        if (res.data.status === "success") {
          setFollower(
            follower.map((personObj) => {
              if (personObj.followerId === followerId) {
                return { ...personObj, isFollowed: true };
              } else {
                return personObj;
              }
            })
          );
          alert("追蹤成功");
        }
        if (res.data.status === "error") {
          alert(res.data.message);
          alert("你已追蹤過這個帳戶");
        }
      }
    }
    // 想取消追蹤這個follower
    if (isFollowed === true) {
      const res = await deleteFollowShip(followerId);
      if (res) {
        if (res.data.status === "success") {
          setFollower(
            follower.map((personObj) => {
              if (personObj.followerId === followerId) {
                return { ...personObj, isFollowed: false };
              } else {
                return personObj;
              }
            })
          );
          alert("取消追蹤成功");
        }
        if (res.data.status === "error") {
          alert(res.data.message);
          alert("你還沒追蹤這個帳戶");
        }
      }
    }
  };

  const handleFollowingBtnClick = (id) => {
    setFollowing(following.filter((fol) => fol.id !== id));
  };

  ///////////////////////////////////////////////////初始畫面渲染 /////////////////////////////////////////////////
  const [userInfo, setUserInfo] = useState([]); //在每一頁的useEffect中會去向後端請求登入者的object資料
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    console.log("execute User Self Follow Page function in useEffect");
    // 首先拿到當前登入的使用者的id先給getUserSelfFollowerAsync和getUserSelfFollowingAsync用，因為非同步的關係，不知道getUserInfoAsync回傳回來的user data會是何年何月..
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
        //後端好了再打開，先用userInfo
        setFollowing(backendUserSelfFollowing);
      } catch (error) {
        console.error(error);
      }
    };

    //最後還是要拿登入的使用者資料，給header渲染userInfo.tweetCount和userInfo.name
    const getUserInfoAsync = async () => {
      try {
        const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
        const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
        const userInfoId = LocalStorageUserInfo.id; //再從這個object拿到登入者的id
        //向後端拿取登入者的object資料
        const backendUserInfo = await getUserInfo(userInfoId);
        //拿到登入者資料後存在userInfo裡面，backendUserInfo會是一個object
        setUserInfo(backendUserInfo);
      } catch (error) {
        console.error(error);
      }
    };

    getUserInfoAsync();
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
          <h5 className="header-title-user-self-name">{userInfo.name}</h5>
          <div className="tweet-amount">
            {userInfo.tweetCount}
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
