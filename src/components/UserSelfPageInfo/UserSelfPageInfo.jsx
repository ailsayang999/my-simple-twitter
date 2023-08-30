import "./userSelfPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import ModalContext from "context/ModalContext";
import { useContext, useState, useEffect } from "react";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";

//這個之後刪掉
import { getUserSelfTweetsDummyData } from "api/tweets";
import { getUserSelfReplyItemsDummyData } from "api/tweets";
import { getUserSelfLikeItemsDummyData } from "api/tweets";

// 引入Modal元件
import PostTweetModal from "components/PostTweetModal/PostTweetModal";
import PutEditUserSelfInfoModal from "components/PutEditUserSelfInfoModal/PutEditUserSelfInfoModal";

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
      {userSelfTweets.map(
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
            </>
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
      {userSelfReply.map(
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
      {userSelfLike.map(
        ({
          TweetId,
          tweetContent,
          tweetBelongerAvatar,
          tweetBelongerName,
          tweetBelongerAccount,
          createdAt,
          tweetReplyCount,
          tweetLikeCount,
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
                        <div className="reply-number">{tweetReplyCount}</div>
                      </div>
                      <div className="like-container">
                        <div className="like-icons">
                          <LikeActiveIcon className="liked-icon" fill="black" />
                        </div>

                        <div className="like-number">{tweetLikeCount}</div>
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

const UserSelfPageInfo = () => {
  // 從Context中拿取toggleReplyModal的function
  const { postModal, inputValue, handleTweetTextAreaChange, handleAddTweet } =
    useContext(ModalContext);
  ////////////////////////////////// 所有暫時Render用DummyData  //////////////////////////////////
  //之後刪掉：
  //使用者所有推文
  const [userSelfTweets, setUserSelfTweets] = useState(
    getUserSelfTweetsDummyData
  );
  //使用者所有回覆
  const [userSelfReply, setUserSelfReply] = useState(
    getUserSelfReplyItemsDummyData
  );
  // 使用者所有喜歡
  const [userSelfLike, setUserSelfLike] = useState(
    getUserSelfLikeItemsDummyData
  );

  //拿到userInfo的avatar和cover跟個人介紹資料
  const [userInfo, setUserInfo] = useState([]); //在每一頁的useEffect中會去向後端請求登入者的object資料

  //串接API: 畫面初始資料
  useEffect(() => {
    console.log("execute User Self Page function in useEffect");

    //首先拿到當前登入的使用者資料
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
    const getUserSelfTweetsAsync = async () => {
      try {
        const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
        const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
        const userInfoId = LocalStorageUserInfo.id; //再從這個object拿到登入者的id
        const backendUserSelfTweets = await getUserSelfTweets(userInfoId);
        //後端好了再打開，先用userInfo
        setUserSelfTweets(backendUserSelfTweets);
      } catch (error) {
        console.error(error);
      }
    };

    const getUserSelfReplyAsync = async () => {
      try {
        const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
        const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
        const userInfoId = LocalStorageUserInfo.id; //再從這個object拿到登入者的id
        const backendUserSelfReply = await getUserSelfReply(userInfoId);
        console.log(userInfoId);
        setUserSelfReply(backendUserSelfReply);
      } catch (error) {
        console.error(error);
      }
    };
    const getUserSelfLikeAsync = async () => {
      try {
        const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
        const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
        const userInfoId = LocalStorageUserInfo.id; //再從這個object拿到登入者的id
        const backendUserSelfLike = await getUserSelfLike(userInfoId);
        setUserSelfLike(backendUserSelfLike);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfoAsync();
    getUserSelfTweetsAsync();
    getUserSelfReplyAsync();
    getUserSelfLikeAsync()
  }, []);

  const navigate = useNavigate();
  // 返回主畫面使用
  const handleBackArrowClick = () => {
    navigate("/main");
  };

  // UserSelfPageInfo的監聽器：，當跟隨者或是跟隨中的button被點按時，會選擇UserSelfFollowPage要渲染的資料 (但是因為會被navigation搶先執行，所以先不用了)
  // const { handleFollowingClick, handleFollowerClick } = useContext(NavigationContext);
  const handleNavigateToFollowingPage = (followingValue) => {
    // handleFollowingClick(followingValue); //測試發現navigate這個大惡霸會搶先執行，handleFollowingClick會怎麼樣都執行不了，但不太懂為什麼navigate會搶先執行ＱＱ
    localStorage.setItem("pageShowFollowContent", followingValue); // 所以只好先把followingValue的資料存在localStorage
    localStorage.setItem("followerDataFromBackEnd")
    navigate("/user/self/follow");
  };
  const handleNavigateToFollowerPage = (followerValue) => {
    // handleFollowerClick(followerValue); //測試發現navigate這個大惡霸會搶先執行，handleFollowingClick會怎麼樣都執行不了，但不太懂為什麼navigate會搶先執行ＱＱ
    localStorage.setItem("pageShowFollowContent", followerValue); // 所以只好先把followerValue的資料存在localStorage，到UserSelfFollowPage的時候再拿
    navigate("/user/self/follow");
  };

  ////////////////////////////////// Modal 相關資料處理  //////////////////////////////////
  // 從Context中拿取toggleReplyModal的function
  const { editModal, toggleEditModal } = useContext(ModalContext);

  //監聽器：handleChange，當PutEditUserSelfInfoModal的edit-name-input發生改變時，更新editNameInput的state
  const [editNameInputValue, setEditNameInputValue] = useState("");
  const handleEditNameInputChange = (value) => {
    setEditNameInputValue(value);
  };
  //監聽器：handleChange，當PutEditUserSelfInfoModal的edit-intro-input發生改變時，更新editIntroInput的state
  const [editIntroInputValue, setEditIntroInputValue] = useState("");
  const handleEditIntroInputChange = (value) => {
    setEditIntroInputValue(value);
  };

  ////////////////////////////////// 更換顯示內容 相關資料處理  //////////////////////////////////

  // 監聽器：handleButtonClick，當navigator的button被點按時，會選擇渲染的資料，userSelfContent所存的文字會決定要渲染哪一個元件
  const [userSelfContent, setUserSelfContent] = useState("user-self-tweet");
  const handleChangeUserSelfContent = (contentValue) => {
    setUserSelfContent(contentValue);
    console.log(contentValue);
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
          <h5 className="header-title-user-self-name">{userInfo.name}</h5>
          <div className="tweet-amount">
            25 <span className="tweet-amount-text">推文</span>
          </div>
        </div>
      </div>
      <div key={userInfo.id}>
        {/* user-self-info-area */}
        <div className="user-self-info-area">
          {/* 以下在EditSelfInfoModal會用到 */}
          <div className="user-self-avatar-cover">
            <div className="user-self-cover-container">
              <img
                src={userInfo.cover}
                alt="userSelfCover"
                className="user-self-cover"
              />
            </div>
            <div className="user-self-avatar-container">
              <img src={userInfo.avatar} alt="" className="user-self-avatar" />
            </div>

            <button
              className="user-self-avatar-edit-btn"
              onClick={toggleEditModal}
            >
              編輯個人資料
            </button>
          </div>

          {/* 個人姓名 */}
          <div className="user-self-name-account-container">
            <h5 className="user-self-name">{userInfo.name}</h5>
            <span className="user-self-account">@{userInfo.account}</span>
          </div>
          {/* 個人介紹 */}
          <div className="user-self-introduction">{userInfo.introduction}</div>

          {/* 個人跟隨中和跟隨者 */}
          <div className="user-self-follow-following-container">
            <button
              className="user-self-following"
              value="following"
              onClick={(e) => {
                handleNavigateToFollowingPage(e.target.value);
              }}
            >
              {userInfo.followerCount} 個
            </button>
            <span className="following-text">跟隨中</span>

            <button
              className="user-self-follower"
              value="follower"
              onClick={(e) => {
                handleNavigateToFollowerPage(e.target.value);
              }}
            >
              {userInfo.followingCount} 個
            </button>
            <span className="follower-text">跟隨者</span>
          </div>
        </div>
      </div>

      {/* user-self-tweet-reply-like-navigator */}
      <div className="user-self-tweet-reply-like-navigator">
        <button
          className={`user-self-tweet ${
            userSelfContent === "user-self-tweet" ? "navigate-active" : ""
          }`}
          value="user-self-tweet"
          onClick={(e) => handleChangeUserSelfContent(e.target.value)}
        >
          推文
        </button>
        <button
          className={`user-self-reply ${
            userSelfContent === "user-self-reply" ? "navigate-active" : ""
          }`}
          value="user-self-reply"
          onClick={(e) => handleChangeUserSelfContent(e.target.value)}
        >
          回覆
        </button>
        <button
          className={`user-self-like ${
            userSelfContent === "user-self-like" ? "navigate-active" : ""
          }`}
          value="user-self-like"
          onClick={(e) => handleChangeUserSelfContent(e.target.value)}
        >
          喜歡的內容
        </button>
      </div>

      {userSelfContent === "user-self-tweet" && (
        <UserSelfTweetContent userSelfTweets={userSelfTweets} />
      )}
      {userSelfContent === "user-self-reply" && (
        <UserSelfReplyContent userSelfReply={userSelfReply} />
      )}
      {userSelfContent === "user-self-like" && (
        <UserSelfLikeContent userSelfLike={userSelfLike} />
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
      {/* 決定編輯個人資料Modal跳出 */}
      {editModal && (
        <PutEditUserSelfInfoModal
          editNameInputValue={editNameInputValue}
          onEditNameInputChange={handleEditNameInputChange}
          editIntroInputValue={editIntroInputValue}
          onEditIntroInputChange={handleEditIntroInputChange}
        />
      )}
    </div>
  );
};

export default UserSelfPageInfo;
