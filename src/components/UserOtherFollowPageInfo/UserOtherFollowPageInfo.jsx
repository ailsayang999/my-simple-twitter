import "./userOtherFollowPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import ModalContext from "context/ModalContext";
import { useAuth } from "context/AuthContext"; //到AuthContext拿是否已驗證
import FollowContext from "context/FollowContext";
// 引入Modal元件
import PostTweetModal from "components/PostTweetModal/PostTweetModal";
import {
  getUserSelfFollower,
  getUserSelfFollowing,
  postFollowShip,
  deleteFollowShip,
} from "api/tweets";

const FollowerContent = ({ userOtherFollower, handleFollowBtnClick }) => {
  // backendUserSelfFollower裡面還有一層

  return (
    <>
      {userOtherFollower?.map(({ isFollowed, follower, followerId }) => {
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
                    onClick={() => handleFollowBtnClick(followerId, isFollowed)}
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

const FollowingContent = ({ userOtherFollowing, handleFollowBtnClick }) => {
  return (
    <>
      {userOtherFollowing?.map(({ followingId, following, isFollowed }) => {
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
                      handleFollowBtnClick(followingId,isFollowed);
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

const UserOtherFollowPageInfo = () => {
  //先從AuthContext拿到驗證是否為true(isAuthenticated:true)
  const { isAuthenticated } = useAuth();
  // 把要傳給follow的state都引入進來
  const {
    follower,
    setFollower,
    following,
    setFollowing,
    handleFollowBtnClick,
  } = useContext(FollowContext);

  const navigate = useNavigate();
  const handleBackArrowClick = () => {
    //如果點按返回箭頭就navigate to /user/other
    navigate("/user/other");
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

  // const handleFollowerBtnClick = async (followerId, isFollowed) => {
  //   const followPayload = {
  //     id: followerId,
  //   };
  //   console.log("followPayload", followPayload);

  //   // 想追蹤這個follower
  //   if (isFollowed === false) {
  //     const res = await postFollowShip(followPayload);
  //     console.log("後端傳來postFollowShip的結果", res);
  //     //如果有追蹤成功的話就：
  //     if (res) {
  //       if (res.data.status === "success") {
  //         setFollower(
  //           follower.map((personObj) => {
  //             if (personObj.followerId === followerId) {
  //               return { ...personObj, isFollowed: true };
  //             } else {
  //               return personObj;
  //             }
  //           })
  //         );
  //         alert("追蹤成功");
  //       }
  //       if (res.data.status === "error") {
  //         alert(res.data.message);
  //         alert("你已追蹤過這個帳戶");
  //       }
  //     }
  //   }
  //   // 想取消追蹤這個follower
  //   if (isFollowed === true) {
  //     const res = await deleteFollowShip(followerId);
  //     if (res) {
  //       if (res.data.status === "success") {
  //         setFollower(
  //           follower.map((personObj) => {
  //             if (personObj.followerId === followerId) {
  //               return { ...personObj, isFollowed: false };
  //             } else {
  //               return personObj;
  //             }
  //           })
  //         );
  //         alert("取消追蹤成功");
  //       }
  //       if (res.data.status === "error") {
  //         console.log("delete FollowShip 有發送成功");
  //         alert(res.data.message);
  //       }
  //     }
  //   }
  // };
  // const handleFollowingBtnClick = (id) => {
  //   setFollowing(following.filter((fol) => fol.id !== id));
  // };

  ///////////////////////////////////////////////////初始畫面渲染 /////////////////////////////////////////////////
  const [userOtherInfo, setUserOtherInfo] = useState([]); //在每一頁的useEffect中會去向後端請求登入者的object資料

  const [userOtherFollower, setUserOtherFollower] = useState([]);
  const [userOtherFollowing, setUserOtherFollowing] = useState([]);

  // 首先先去拿在UserOtherPage存到localStorage的localStorageUserObjectString
  const localStorageUserOtherObjectString =
    localStorage.getItem("userOtherInfo");
  // 然後在把他變成object，讓header做渲染
  const userOtherInfoObject = JSON.parse(localStorageUserOtherObjectString);
  console.log("userOtherInfoObject",userOtherInfoObject)

  //給PostTweetModal用的
  const localStorageUserObjectString = localStorage.getItem("userInfo");
  const userInfoObject = JSON.parse(localStorageUserObjectString); //因為PostTweetModal裡面的推文者還是登入者本身，userInfoObject是登入者的userInfo

  useEffect(() => {
    console.log("execute User Other Follow Page function in useEffect");
    //先把userOtherInfo更新
    setUserOtherInfo(userOtherInfoObject);

    const getUserSelfFollowerAsync = async () => {
      //console.log("userOtherInfo id", userOtherInfo.id);
      try {
        const backendUserOtherFollower = await getUserSelfFollower(
          userOtherInfoObject.id
        );
        setUserOtherFollower(backendUserOtherFollower);
        console.log("backendUserOtherFollower: ", backendUserOtherFollower);
      } catch (error) {
        console.error(error);
      }
    };

    const getUserSelfFollowingAsync = async () => {
      try {
        const backendUserOtherFollowing = await getUserSelfFollowing(
          userOtherInfoObject.id
        );
        //後端好了再打開，先用userInfo
        setUserOtherFollowing(backendUserOtherFollowing);
        console.log("backendUserSelfFollowing: ", backendUserOtherFollowing);
      } catch (error) {
        console.error(error);
      }
    };

    getUserSelfFollowerAsync();
    getUserSelfFollowingAsync();
  }, []);

  return (
    <div className="user-other-follow-page-info">
      {/* 以下header UserSelfPage, UserOtherPage UserSelfFollowPage, UserOtherFollowPage 可以重複使用 */}
      <div className="header-container">
        <BackArrowIcon
          className="back-arrow-icon"
          onClick={handleBackArrowClick}
        />

        <div className="name-tweet-amount-container">
          <h5 className="header-title-user-self-name">
            {userOtherInfoObject.name}
          </h5>
          <div className="tweet-amount">
            {userOtherInfoObject.tweetCount}
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

      {/* Render Follower */}
      {showFollowPageContent === "follower" && (
        <FollowerContent
          userOtherFollower={userOtherFollower}
          handleFollowBtnClick={handleFollowBtnClick}
        />
      )}

      {/* Render Following */}
      {showFollowPageContent === "following" && (
        <FollowingContent
          userOtherFollowing={userOtherFollowing}
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

export default UserOtherFollowPageInfo;
