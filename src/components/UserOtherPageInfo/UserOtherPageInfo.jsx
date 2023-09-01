import "./userOtherPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import ModalContext from "context/ModalContext";
import UserInfoContext from "context/UserInfoContext";
import { useAuth } from "context/AuthContext"; //到AuthContext拿是否已驗證

import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";
import { ReactComponent as NotifyIconActiveIcon } from "assets/icons/notifyIconActive.svg";
import { ReactComponent as MsgIcon } from "assets/icons/msgIcon.svg";
// 引入Modal元件
import PostTweetModal from "components/PostTweetModal/PostTweetModal";
import {
  getUserInfo,
  getUserSelfTweets,
  getUserSelfReply,
  getUserSelfLike,
} from "api/tweets";

/////////////////////////////////////////// Change Content Components //////////////////////////////////
// 瀏覽使用者所有Tweet
const UserSelfTweetContent = ({ userSelfTweets }) => {
  return (
    <>
      {/* 所有user-self 推的文 */}
      {userSelfTweets?.map(
        ({
          TweetId,
          tweetBelongerName,
          tweetBelongerAccount,
          tweetBelongerAvatar,
          description,
          createdAt,
          replyCount,
          likeCount,
        }) => {
          return (
            <div className="post-item-container" key={TweetId}>
              <div className="post-item-wrapper">
                <img
                  src={tweetBelongerAvatar}
                  alt=""
                  className="post-item-avatar"
                />

                <div className="post-item-content">
                  <div className="user-post-info">
                    <div className="name">{tweetBelongerName}</div>
                    <div className="account">@{tweetBelongerAccount}</div>
                    <div className="time">· {createdAt}</div>
                  </div>

                  <div className="post-content">{description}</div>

                  <div className="reply-like-container">
                    <div className="reply-container">
                      <ReplyIcon className="reply-icon" />
                      <div className="reply-number">{replyCount}</div>
                    </div>
                    <div className="like-container">
                      <div className="like-icons">
                        <LikeIcon className="like-icon" />
                      </div>

                      <div className="like-number">{likeCount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      )}
    </>
  );
};
// 瀏覽使用者所有的Reply
const UserSelfReplyContent = ({ userSelfReply }) => {
  return (
    <>
      {/* 所有user-self 的回覆 */}
      {userSelfReply?.map(
        ({
          replyId,
          comment,
          replierName,
          replierAvatar,
          replierAccount,
          tweetBelongerAccount,
          createdAt,
        }) => {
          return (
            <>
              <div className="reply-item-container" key={replyId}>
                <div className="reply-item-wrapper">
                  <img
                    src={replierAvatar}
                    alt={replierAvatar}
                    className="reply-item-avatar"
                  />

                  <div className="reply-item-content">
                    <div className="user-reply-info">
                      <div className="replier-name">{replierName}</div>
                      <div className="replier-account">@{replierAccount}</div>
                      <div className="reply-time">· {createdAt}</div>
                    </div>

                    <div className="reply-to-tweet-belonger-account-container">
                      回覆
                      <span className="reply-to-tweet-belonger-account">
                        @{tweetBelongerAccount}
                      </span>
                    </div>

                    <div className="reply-content">{comment}</div>
                  </div>
                </div>
              </div>
            </>
          );
        }
      )}
    </>
  );
};
// 瀏覽使用者所有的Like
const UserSelfLikeContent = ({ userSelfLike }) => {
  return (
    <>
      {userSelfLike?.map(
        ({
          TweetId,
          tweetContent,
          tweetBelongerAvatar,
          tweetBelongerName,
          tweetBelongerAccount,
          createdAt,
          replyCount,
          likeCount,
        }) => {
          return (
            <>
              <div className="post-item-container" key={TweetId}>
                <div className="post-item-wrapper">
                  <img
                    src={tweetBelongerAvatar}
                    alt=""
                    className="post-item-avatar"
                  />

                  <div className="post-item-content">
                    <div className="user-post-info">
                      <div className="name">{tweetBelongerName}</div>
                      <div className="account">@{tweetBelongerAccount}</div>
                      <div className="time">· {createdAt}</div>
                    </div>

                    <div className="post-content">{tweetContent}</div>

                    <div className="reply-like-container">
                      <div className="reply-container">
                        <ReplyIcon className="reply-icon" />
                        <div className="reply-number">{replyCount}</div>
                      </div>
                      <div className="like-container">
                        <div className="like-icons">
                          <LikeActiveIcon className="liked-icon" />
                        </div>

                        <div className="like-number">{likeCount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }
      )}
    </>
  );
};
////////////////////////////////////////////////////////////////////////////////////////////////////////

const UserOtherPageInfo = () => {
  //先從AuthContext拿到驗證是否為true(isAuthenticated:true)
  const { isAuthenticated } = useAuth();

  //先從UserInfoContext拿到驗證是否為userInfo
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const navigate = useNavigate();
  const handleBackArrowClick = () => {
    navigate("/main");
  };
  // 把要傳給PostTweetModal的props都引入進來
  const { postModal, inputValue, handleTweetTextAreaChange, handleAddTweet } =
    useContext(ModalContext);
  //使用者所有推文
  const [userSelfTweets, setUserSelfTweets] = useState([]);
  //使用者所有回覆
  const [userSelfReply, setUserSelfReply] = useState([]);
  // 使用者所有喜歡
  const [userSelfLike, setUserSelfLike] = useState([]);
  //拿到userInfo的avatar和cover跟個人介紹資料
  const [userOtherInfo, setUserOtherInfo] = useState([]); //在每一頁的useEffect中會去向後端請求登入者的object資料

  // 先拿userInfoObject給PostTweetModal
  const localStorageUserObjectString = localStorage.getItem(
    "UserInfoObjectString"
  );
  const userInfoObject = JSON.parse(localStorageUserObjectString);
  console.log("userInfoObject", userInfoObject);

  // 因為還沒拿到userOtherInfoObject，所以先用localStorageUserOtherIdNum給useEffect裡的非同步
  const localStorageUserOtherId = localStorage.getItem("userOtherId"); //拿下來會是一比string的資料
  const localStorageUserOtherIdNum = Number(localStorageUserOtherId);
  console.log("localStorageUserOtherIdNum: ", localStorageUserOtherIdNum);

  //  串接API: 畫面初始資料
  useEffect(() => {
    console.log("execute User Self Page function in useEffect");

    //首先拿到當前登入的使用者資料
    const getUserOtherInfoAsync = async () => {
      try {
        //向後端拿取登入者的object資料
        const backendUserOtherInfo = await getUserInfo(
          localStorageUserOtherIdNum
        );
        //拿到登入者資料後存在userInfo裡面，backendUserInfo會是一個object
        setUserOtherInfo(backendUserOtherInfo);
        // 先存到localStorage給userOtherFollowPage用
        const userOtherInfo = JSON.stringify(backendUserOtherInfo);
        localStorage.setItem("userOtherInfo", userOtherInfo);
      } catch (error) {
        console.error(error);
      }
    };
    const getUserSelfTweetsAsync = async () => {
      try {
        const backendUserSelfTweets = await getUserSelfTweets(
          localStorageUserOtherIdNum
        );
        //後端好了再打開，先用userInfo
        setUserSelfTweets(backendUserSelfTweets);
      } catch (error) {
        console.error(error);
      }
    };
    const getUserSelfReplyAsync = async () => {
      try {
        const backendUserSelfReply = await getUserSelfReply(
          localStorageUserOtherIdNum
        );
        setUserSelfReply(backendUserSelfReply);
      } catch (error) {
        console.error(error);
      }
    };
    const getUserSelfLikeAsync = async () => {
      try {
        const backendUserSelfLike = await getUserSelfLike(
          localStorageUserOtherIdNum
        );
        setUserSelfLike(backendUserSelfLike);
      } catch (error) {
        console.error(error);
      }
    };
    getUserOtherInfoAsync();
    getUserSelfTweetsAsync();
    getUserSelfReplyAsync();
    getUserSelfLikeAsync();
  }, []);

  // UserSelfPageInfo的監聽器：，當跟隨者或是跟隨中的button被點按時，會選擇UserSelfFollowPage要渲染的資料 (但是因為會被navigation搶先執行，所以先不用了)
  // const { handleFollowingClick, handleFollowerClick } = useContext(NavigationContext);
  const handleNavigateToFollowingPage = (followingValue) => {
    // handleFollowingClick(followingValue); //測試發現navigate這個大惡霸會搶先執行，handleFollowingClick會怎麼樣都執行不了，但不太懂為什麼navigate會搶先執行ＱＱ
    localStorage.setItem("pageShowFollowContent", followingValue); // 所以只好先把followingValue的資料存在localStorage
    navigate("/user/other/follow");
  };
  const handleNavigateToFollowerPage = (followerValue) => {
    // handleFollowerClick(followerValue); //測試發現navigate這個大惡霸會搶先執行，handleFollowingClick會怎麼樣都執行不了，但不太懂為什麼navigate會搶先執行ＱＱ
    localStorage.setItem("pageShowFollowContent", followerValue); // 所以只好先把followerValue的資料存在localStorage，到UserSelfFollowPage的時候再拿
    navigate("/user/other/follow");
  };

  ////////////////////////////////// 更換顯示內容 相關資料處理  //////////////////////////////////

  // 監聽器：handleButtonClick，當navigator的button被點按時，會選擇渲染的資料，userSelfContent所存的文字會決定要渲染哪一個元件
  const [userOtherContent, setUserOtherContent] = useState("user-other-tweet");
  const handleChangeUserOtherContent = (contentValue) => {
    setUserOtherContent(contentValue);
    console.log(contentValue);
  };

  console.log("User other page userInfo: ", userOtherInfo);
  return (
    <div className="user-other-page-info">
      {/* 以下渲染*/}
      <div className="header-container">
        <BackArrowIcon
          className="back-arrow-icon"
          onClick={handleBackArrowClick}
        />
        <div className="name-tweet-amount-container">
          <h5 className="header-title-user-other-name">
            {userOtherInfo?.name}
          </h5>
          <div className="tweet-amount">
            {userOtherInfo?.tweetCount}
            <span className="tweet-amount-text">推文</span>
          </div>
        </div>
      </div>
      {/* 以下渲染*/}
      {/* user-other-info-area */}
      <div className="user-other-info-area">
        {/* 以下在EditSelfInfoModal會用到 */}
        <div className="user-other-avatar-cover">
          <div className="user-other-cover-container">
            <img
              src={userOtherInfo?.cover}
              alt="userOtherCover"
              className="user-other-cover"
            />
          </div>
          <div className="user-other-avatar-container">
            <img
              src={userOtherInfo?.avatar}
              alt=""
              className="user-other-avatar"
            />
          </div>
          {/* <button className="user-other-avatar-edit-btn">正在跟隨</button> */}
          <NotifyIconActiveIcon className="noti-icon" />
          <MsgIcon className="msg-icon" />
          <button
            className={`${
              userOtherInfo.isFollowed
                ? "user-other-following-btn"
                : "user-other-follow-btn"
            }`}
            // onClick={() => handleFollowerBtnClick(userOtherInfo.id, userOtherInfo.isFollowed)}
          >
            {userOtherInfo.isFollowed ? "正在跟隨" : "跟隨"}
          </button>
        </div>

        {/* 個人姓名 */}
        <div className="user-other-name-account-container">
          <h5 className="user-other-name">{userOtherInfo?.name}</h5>
          <span className="user-other-account">@{userOtherInfo?.account}</span>
        </div>
        {/* 個人介紹 */}
        <div className="user-other-introduction">
          {userOtherInfo?.introduction}
        </div>

        {/* 個人跟隨中和跟隨者 */}
        <div className="user-other-follow-following-container">
          <button
            className="user-other-following"
            value="following"
            onClick={(e) => {
              handleNavigateToFollowingPage(e.target.value);
            }}
          >
            {userOtherInfo?.followerCount} 個
          </button>
          <span className="following-text">跟隨中</span>

          <button
            className="user-other-follower"
            value="follower"
            onClick={(e) => {
              handleNavigateToFollowerPage(e.target.value);
            }}
          >
            {userOtherInfo?.followingCount} 個
          </button>
          <span className="follower-text">跟隨者</span>
        </div>
      </div>

      {/* user-other-tweet-reply-like-navigator */}
      <div className="user-other-tweet-reply-like-navigator">
        <button
          className={`user-other-tweet ${
            userOtherContent === "user-other-tweet" ? "navigate-active" : ""
          }`}
          value="user-other-tweet"
          onClick={(e) => handleChangeUserOtherContent(e.target.value)}
        >
          推文
        </button>
        <button
          className={`user-other-reply ${
            userOtherContent === "user-other-reply" ? "navigate-active" : ""
          }`}
          value="user-other-reply"
          onClick={(e) => handleChangeUserOtherContent(e.target.value)}
        >
          回覆
        </button>
        <button
          className={`user-other-like ${
            userOtherContent === "user-other-like" ? "navigate-active" : ""
          }`}
          value="user-other-like"
          onClick={(e) => handleChangeUserOtherContent(e.target.value)}
        >
          喜歡的內容
        </button>
      </div>

      {userOtherContent === "user-other-tweet" && (
        <UserSelfTweetContent userSelfTweets={userSelfTweets} />
      )}
      {userOtherContent === "user-other-reply" && (
        <UserSelfReplyContent userSelfReply={userSelfReply} />
      )}
      {userOtherContent === "user-other-like" && (
        <UserSelfLikeContent userSelfLike={userSelfLike} />
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

export default UserOtherPageInfo;
