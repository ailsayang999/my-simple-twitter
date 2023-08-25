import "./userSelfPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import ModalContext from "context/ModalContext";
import NavigationContext from "context/NavigationContext";
import userSelfInfoCover from "assets/images/fakeUserCover.png";
import userSelfAvatar from "assets/images/fakeUserAvatar.png";
import { useContext, useState } from "react";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";

//這個之後刪掉
import { getUserSelfTweetsDummyData } from "api/tweets";
import { getUserSelfReplyItemsDummyData } from "api/tweets";
import { getUserSelfLikeItemsDummyData } from "api/tweets";

import PutEditUserSelfInfoModal from "components/PutEditUserSelfInfoModal/PutEditUserSelfInfoModal";

/////////////////////////////////////////// Change Content Components //////////////////////////////////
// 瀏覽使用者所有Tweet
const UserSelfTweetContent = ({ userSelfTweets }) => {
  return (
    <>
      {/* 所有user-self 推的文 */}
      {userSelfTweets.map(
        ({ id, description, author, createdAt, likeCount, replyCount }) => {
          return (
            <>
              <div className="post-item-container" key={id}>
                <div className="post-item-wrapper">
                  <img
                    src={author.avatar}
                    alt=""
                    className="post-item-avatar"
                  />

                  <div className="post-item-content">
                    <div className="user-post-info">
                      <div className="name">{author.name}</div>
                      <div className="account">@{author.account}</div>
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
        ({ id, description, author, createdAt, likeCount, replyCount }) => {
          return (
            <>
              <div className="post-item-container" key={id}>
                <div className="post-item-wrapper">
                  <img
                    src={author.avatar}
                    alt=""
                    className="post-item-avatar"
                  />

                  <div className="post-item-content">
                    <div className="user-post-info">
                      <div className="name">{author.name}</div>
                      <div className="account">@{author.account}</div>
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////

const UserSelfPageInfo = () => {
  const navigate = useNavigate();
  // 返回主畫面使用
  const handleBackArrowClick = () => {
    navigate("/main");
  };

  // UserSelfPageInfo的監聽器：，當跟隨者或是跟隨中的button被點按時，會選擇UserSelfFollowPage要渲染的資料，followContent所存的文字會決定要渲染哪一個元件
  // 從Context中拿取setFollowContent的function
  const { followContent, setFollowContent } = useContext(NavigationContext);

  // 導向UserSelfFollowPageInfo畫面使用，根據followContent，followContent= following
  const handleFollowingClick = (followingValue) => {
    setFollowContent(followingValue);
    navigate("/user/self/follow");
    console.log(followContent);
  };
  // 導向UserSelfFollowPageInfo畫面使用，根據followContent，followContent= follower
  const handleFollowerClick = (followerValue) => {
    setFollowContent(followerValue);
    navigate("/user/self/follow");
    console.log(followContent);
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
          <button
            className="user-self-avatar-edit-btn"
            onClick={toggleEditModal}
          >
            編輯個人頁面
          </button>
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
          <button
            className="user-self-following"
            onClick={(e) => {
              handleFollowingClick(e.target.value);
            }}
            value="following"
          >
            {34} 個<span className="following-text">跟隨中</span>
          </button>
          <button
            className="user-self-follower"
            onClick={(e) => {
              handleFollowerClick(e.target.value);
            }}
            value="follower"
          >
            {56} 個<span className="follower-text">跟隨者</span>
          </button>
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
