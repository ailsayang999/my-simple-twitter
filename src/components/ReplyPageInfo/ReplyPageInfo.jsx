import "./replyPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext"; //到AuthContext拿是否已驗證
import { useContext, useState, useEffect } from "react";
import ModalContext from "context/ModalContext";
import UserInfoContext from "context/UserInfoContext";
import {
  getUserInfo,
  getSpecificTweet,
  getSpecificTweetReply,
  postTweetUnlike,
  postTweetLike,
} from "api/tweets";

// 引入Modal元件
import PostTweetModal from "components/PostTweetModal/PostTweetModal";
import PostReplyModal from "components/PostReplyModal/PostReplyModal";

const ReplyPageInfo = () => {
  //處理回到主頁的navigation
  const navigate = useNavigate();
  const handleBackArrowClick = () => {
    navigate("/main");
  };

  // 導向UserOtherPage
  const handleNavigateToUserOtherPage = () => {
    navigate("/user/other");
  };

  // 從Context中拿取toggleReplyModal的function
  const {
    postModal,
    inputValue,
    handleTweetTextAreaChange,
    handleAddTweet,
    replyModal,
    toggleReplyModal,
    ReplyInputValue,
    specificTweet,
    setSpecificTweet,
    specificTweetReplies,
    setSpecificTweetReplies,
    handleReplyTextAreaChange,
    handleTweetReply,
  } = useContext(ModalContext);

  //先從AuthContext拿到驗證是否為true(isAuthenticated:true)
  const { isAuthenticated } = useAuth();

  //先從UserInfoContext拿到驗證是否為userInfo
  const { userInfo } = useContext(UserInfoContext);
  //處理時間換算timeDiff函式
  const timeDiff = (time) => {
    const currentDate = new Date();
    const createdAtDate = new Date(time);

    const timeDifference = currentDate - createdAtDate;
    const minsDifference = Math.floor(timeDifference / (60 * 1000));
    const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const yearsDifference = Math.floor(
      timeDifference / (365 * 24 * 60 * 60 * 1000)
    );

    if (minsDifference < 60) {
      let newTime = `${Math.floor(timeDifference / (60 * 1000))} 分鐘`;
      return newTime;
    } else if (daysDifference < 1) {
      let newTime = `${Math.floor(timeDifference / (60 * 60 * 1000))} 小時`;
      return newTime;
    } else if (daysDifference < 30) {
      let newTime = `${daysDifference} 天`;
      return newTime;
    } else if (daysDifference < 365) {
      const month = String(createdAtDate.getMonth() + 1).padStart(2, "0");
      const day = String(createdAtDate.getDate()).padStart(2, "0");
      let newTime = `${month}-${day}`;
      return newTime;
    } else {
      let newTime = `${yearsDifference} 年`;
      return newTime;
    }
  };

  // 先拿到初始的資料
  useEffect(() => {
    // console.log("Reply page execute useEffect");
    //  驗證沒有成功的話
    if (!isAuthenticated) {
      // 頁面跳轉到login頁面
      navigate("/login");
    }

    //拿到被點擊的貼文資料
    const getSpecificTweetAsync = async () => {
      //因為getSpecificTweet是非同步的操作，有可能會失敗，所以我們要用try catch把它包起來
      try {
        // 先把mainPage的某個一個特定tweet的id拿出來
        const specificTweetId = localStorage.getItem("specific-tweetId");
        // console.log(typeof specificTweetId);
        const specificTweetIdNum = Number(specificTweetId);
        const backendSpecificTweet = await getSpecificTweet(specificTweetIdNum); //用await去取得所有後端specificTweet
        const specificTweetArray = [];
        specificTweetArray.push(backendSpecificTweet);
        // console.log("specificTweetArray", specificTweetArray);
        setSpecificTweet(specificTweetArray);
      } catch (error) {
        console.error(error);
      }
    };
    // 再來是拿這篇文的所有回覆
    const getSpecificTweetReplyAsync = async () => {
      try {
        // 先把mainPage的某個一個特定tweet的id拿出來
        const specificTweetId = localStorage.getItem("specific-tweetId");
        // console.log(typeof specificTweetId);
        const specificTweetIdNum = Number(specificTweetId);
        const backendSpecificTweetReplies = await getSpecificTweetReply(
          specificTweetIdNum
        );
        setSpecificTweetReplies(backendSpecificTweetReplies);
      } catch (error) {
        console.error(error);
      }
    };

    getSpecificTweetAsync();
    getSpecificTweetReplyAsync();
  }, []); //後面的dependency是specificTweet和specificTweetReplies，兩者改變就要讓愛心的數字可動態更新

  const handleToggleLike = async (specificTweet, setSpecificTweet) => {
    // console.log(specificTweet);
    // 拿到這篇文章Like初始狀態
    // console.log("specificTweet:", specificTweet);
    const specificToggleTweetLike = specificTweet[0].isLiked;
    // console.log("此篇貼文的Like初始狀態: ", specificToggleTweetLike);
    const specificToggleTweetLikeId = specificTweet[0].id;
    // console.log(specificToggleTweetLikeId);

    if (specificToggleTweetLike === true) {
      const res = await postTweetUnlike(specificToggleTweetLikeId);
      //若後端有把isLike改成false成功
      if (res.data) {
        if (res.data.status === "success") {
          //把前端畫面的isLiked改為false做畫面渲染
          setSpecificTweet(
            specificTweet.map((specificTweet) => {
              if (specificTweet.id === specificToggleTweetLikeId) {
                return {
                  ...specificTweet,
                  isLiked: false,
                  likeCount: specificTweet.likeCount - 1,
                };
              } else {
                return specificTweet;
              }
            })
          );
          // alert("Unlike成功");
          return;
        }
      } else {
        return alert("Unlike未成功");
      }
    }

    if (specificToggleTweetLike === false) {
      const res = await postTweetLike(specificToggleTweetLikeId);
      //若後端有把isLike改成true成功
      if (res.data) {
        //若喜歡喜歡成功
        if (res.data.status === "success") {
          //把前端畫面的isLiked改為true做畫面渲染
          // setSpecificTweet({ ...specificTweet, isLike: true });
          setSpecificTweet(
            specificTweet.map((specificTweet) => {
              if (specificTweet.id === specificToggleTweetLikeId) {
                return {
                  ...specificTweet,
                  isLiked: true,
                  likeCount: specificTweet.likeCount + 1,
                };
              } else {
                return specificTweet;
              }
            })
          );
          // alert("Like成功");
          // console.log(specificTweet);
          return;
        } else {
          return alert("Like未成功！");
        }
      }
    }
  };

  return (
    <div className="reply-page-info">
      {/* Render specific Post 是從ModalContext那裡拿的 */}

      {specificTweet.map(
        ({
          id,
          authorAvatar,
          authorName,
          authorAccount,
          description,
          createdAt,
          replyCount,
          likeCount,
          isLiked,
        }) => {
          return (
            <div key={id}>
              <div className="header-container">
                <BackArrowIcon
                  className="back-arrow-icon"
                  onClick={handleBackArrowClick}
                />
                <h4 className="header-title">推文</h4>
              </div>
              <div className="reply-post">
                <div className="tweet-area-wrapper">
                  <div className="tweet-area-container">
                    <div className="tweet-author-area">
                      <img
                        src={authorAvatar}
                        alt=""
                        className="author-avatar"
                      />
                      <div className="tweet-account-name-area">
                        <div className="tweet-author-name">{authorName}</div>
                        <div className="tweet-author-account">
                          @{authorAccount}
                        </div>
                      </div>
                    </div>
                    <div className="tweet-text-area">{description}</div>
                    <div className="tweet-time-area">
                      <div className="tweet-time">{timeDiff(createdAt)}</div>
                    </div>
                  </div>
                </div>
                <div className="reply-like-area-wrapper">
                  <div className="reply-like-area">
                    <div className="reply-count">
                      <div className="reply-num">{replyCount}</div>
                      <div className="reply-text">回覆</div>
                    </div>
                    <div className="like-count">
                      <div className="like-num">{likeCount}</div>
                      <div className="like-text">喜歡次數</div>
                    </div>
                  </div>
                </div>
                <div className="like-count-icon-area-wrapper">
                  <div className="like-count-icon-area">
                    <ReplyIcon
                      className="tweet-reply-icon"
                      onClick={toggleReplyModal}
                    />
                    <div
                      className="tweet-like-icons"
                      onClick={() => {
                        handleToggleLike(specificTweet, setSpecificTweet);
                      }}
                    >
                      <LikeIcon
                        className={`tweet-like-icon ${
                          !isLiked ? "like-gray" : ""
                        }`}
                      />
                      <LikeActiveIcon
                        className={`tweet-liked-icon ${
                          isLiked ? "like-active" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      )}

      {/* Render specific Post all replies 是從ModalContext那裡拿的 */}
      {specificTweetReplies.map(
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
                    onClick={handleNavigateToUserOtherPage}
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

      {/* Modal ：根據replyModal的布林值決定是否要跳出PostReplyModal component*/}
      {replyModal && (
        <PostReplyModal
          ReplyInputValue={ReplyInputValue}
          onReplyTextAreaChange={handleReplyTextAreaChange}
          onAddTweetReply={handleTweetReply}
          userAvatar={userInfo.avatar}
          specificTweet={specificTweet}
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

export default ReplyPageInfo;
