import "./userOtherPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { useNavigate } from "react-router-dom";
import userOtherInfoCover from "assets/images/fakeUserOtherCover.png";
import userOtherAvatar from "assets/images/fakeUserOtherAvatar.png"
import { useContext, useState } from "react";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";

//這個之後刪掉
import { getUserSelfTweetsDummyData } from "api/tweets";
import { getUserSelfReplyItemsDummyData } from "api/tweets";
import { getUserSelfLikeItemsDummyData } from "api/tweets";

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
////////////////////////////////////////////////////////////////////////////////////////////////////////

const UserOtherPageInfo = () => {
  const navigate = useNavigate();
  const handleBackArrowClick = () => {
    navigate("/main");
  };

  ////////////////////////////////// 更換顯示內容 相關資料處理  //////////////////////////////////

  // 監聽器：handleButtonClick，當navigator的button被點按時，會選擇渲染的資料，userSelfContent所存的文字會決定要渲染哪一個元件
  const [userOtherContent, setUserOtherContent] = useState("user-other-tweet");
  const handleChangeUserOtherContent = (contentValue) => {
    setUserOtherContent(contentValue);
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
    <div className="user-other-page-info">
      {/* 以下渲染*/}
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
      {/* 以下渲染*/}
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
    </div>
  );
};

export default UserOtherPageInfo;
