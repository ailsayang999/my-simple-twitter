import "./mainPageInfo.scss";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";
import { useContext, useEffect } from "react";
import ModalContext from "context/ModalContext";
import { useAuth } from "context/AuthContext"; //到AuthContext拿是否已驗證
import { useNavigate } from "react-router-dom";
import {
  getTweets,
  getUserInfo,
  postTweetUnlike,
  postTweetLike,
} from "api/tweets";
// 引入Modal元件
import PostTweetModal from "components/PostTweetModal/PostTweetModal";
import PostReplyModal from "components/PostReplyModal/PostReplyModal";

const MainPageInfo = () => {
  const navigate = useNavigate();
  // 從Context中拿取toggleReplyModal的function
  const {
    userInfoId,
    userInfo,
    setUserInfo,
    tweets,
    setTweets,
    postModal,
    togglePostModal,
    inputValue,
    handleTweetTextAreaChange,
    handleAddTweet,
    replyModal,
    toggleReplyModal,
    ReplyInputValue,
    specificTweet,
    handleReplyTextAreaChange,
    handleTweetReply,
  } = useContext(ModalContext);

  //先從AuthContext拿到驗證是否為true(isAuthenticated:true)
  const { isAuthenticated } = useAuth();

  // 如果今天mainPage的ReplyIcon被點擊的話，就要先把被點擊的specific-tweetId給存到localStorage，然後把Reply Modal給pop出來
  const handleSpecificPostReplyIconClick = (id) => {
    localStorage.setItem("specific-tweetId", id);
    toggleReplyModal();
  };
  //如果是文章被點擊的話，不但要存specific-tweetId，還要navigate到replyPage
  const handleNavigateToReplyPage = (id) => {
    localStorage.setItem("specific-tweetId", id);
    navigate("/reply");
  };

  // 導向UserOtherPage
  const handleNavigateToUserOtherPage = () => {
    navigate("/user/other");
  };

  ////////////////////////////////////////////////////////////////////////////////////////////串接API getTweets 和  getUserInfo useEffect做初始畫面渲染 ///////////////////////////
 
  
  //串接API: tweets畫面初始化，顯示過去tweets內所有資訊
  useEffect(() => {
    //首先拿到當前登入的使用者資料
    const getUserInfoAsync = async () => {
      try {
        //向後端拿取登入者的object資料
        const backendUserInfo = await getUserInfo(userInfoId);
        //拿到登入者資料後存在userInfo裡面，userInfo會是一個object
        setUserInfo(backendUserInfo);
      } catch (error) {
        console.error(error);
      }
    };
    const getTweetsAsync = async () => {
      //因為getTweets是非同步的操作，有可能會失敗，所以我們要用try catch把它包起來
      try {
        const backendTweets = await getTweets(); //用await去取得所有後端tweets的項目
        setTweets(backendTweets);
      } catch (error) {
        console.error(error);
      }
    };
    //
    getUserInfoAsync();
    //getTweetsAsync這個function定義完成之後，我們可以直接執行它
    getTweetsAsync();
  }, [tweets,userInfo,userInfoId]); //後面的dependency是tweets和...，兩者改變就要讓愛心的數字可動態更新

  //////////////////////////////////////////////////////////////串接API postTweetLike and postTweetUnlike：處理某篇貼文isLike的boolean值 ///////////////////////////

  // 前端畫面處理isLikedActive的state做畫面渲染
  // 喜歡功能
  const handleToggleLike = async (id) => {
    console.log(tweets);
    // 找出這篇文章
    const specificToggleTweet = tweets.filter((tweet) => tweet.id === id);
    console.log(specificToggleTweet);
    // 拿到這篇文章Like初始狀態
    const specificToggleTweetLike = specificToggleTweet[0].isLiked;
    console.log("此篇貼文的Like初始狀態: ", specificToggleTweetLike);

    if (specificToggleTweetLike === true) {
      const res = await postTweetUnlike(id);
      //若後端有把isLike改成false成功
      if (res.data) {
        if (res.data.status === "success") {
          //把前端畫面的isLiked改為false做畫面渲染
          setTweets(
            tweets.map((tweet) => {
              if (tweet.id === id) {
                return {
                  ...tweet,
                  isLiked: false,
                };
              } else {
                return tweet;
              }
            })
          );
          alert("Unlike成功");
          return;
        }
      } else {
        return alert("Unlike未成功");
      }
    }

    if (specificToggleTweetLike === false) {
      const res = await postTweetLike(id);
      //若後端有把isLike改成true成功
      if (res.data) {
        //若喜歡喜歡成功
        if (res.data.status === "success") {
          //把前端畫面的isLiked改為true做畫面渲染
          setTweets(
            tweets.map((tweet) => {
              if (tweet.id === id) {
                return {
                  ...tweet,
                  isLiked: true,
                };
              } else {
                return tweet;
              }
            })
          );
          alert("Like成功");
          return;
        } else {
          return alert("Like未成功！");
        }
      }
    }
  };


  return (
    <div className="main-page-info">
      {/* 以下header可以重複使用 */}
      <div className="header-container">
        <header>
          <h4>{"首頁"}</h4>
        </header>
      </div>
      {/* Post Area: UserInfo Avatar */}
      <div className="post-area-wrapper">
        <div className="post-area-container">
          <div className="posting-area">
            <img
              src={userInfo && userInfo.avatar}
              alt=""
              className="user-avatar"
            />
            {/* 點擊Post區會改變postModal的布林值，post彈出 */}
            <span className="text-area" onClick={togglePostModal}>
              有什麼新鮮事
            </span>
          </div>
          <div className="post-tweet-button-container">
            <button className="post-tweet-button">推文</button>
          </div>
        </div>
      </div>

      {/* 把後端傳來的tweets都渲染出來*/}
      {tweets.map(
        ({
          id,
          description,
          authorAvatar,
          authorName,
          authorAccount,
          createdAt,
          likeCount,
          replyCount,
          isLiked,
        }) => {
          return (
            <>
              <div className="post-item-container" key={id}>
                <div className="post-item-wrapper">
                  <img
                    src={authorAvatar}
                    alt=""
                    className="post-item-avatar"
                    onClick={handleNavigateToUserOtherPage}
                  />

                  <div className="post-item-content">
                    <div className="user-post-info">
                      <div className="name">{authorName}</div>
                      <div className="account">@{authorAccount}</div>
                      <div className="time">· {createdAt}</div>
                    </div>

                    <div
                      className="post-content"
                      onClick={() => {
                        handleNavigateToReplyPage(id);
                      }}
                    >
                      {description}
                    </div>

                    <div className="reply-like-container">
                      <div className="reply-container">
                        <ReplyIcon
                          className="reply-icon"
                          onClick={() => {
                            handleSpecificPostReplyIconClick(id);
                          }}
                        />
                        <div className="reply-number">{replyCount}</div>
                      </div>
                      <div className="like-container">
                        <div
                          className="like-icons"
                          onClick={() => {
                            handleToggleLike(id);
                          }}
                        >
                          <LikeIcon
                            className={`like-icon ${
                              !isLiked ? "like-gray" : ""
                            }`}
                          />
                          <LikeActiveIcon
                            className={`liked-icon ${
                              isLiked ? "like-active" : ""
                            }`}
                          />
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
    </div>
  );
};

export default MainPageInfo;
