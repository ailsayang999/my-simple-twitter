import "./mainPageInfo.scss";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";
import { useContext, useEffect } from "react";
import ModalContext from "context/ModalContext";
import UserInfoContext from "context/UserInfoContext";

import { useAuth } from "context/AuthContext"; //到AuthContext拿是否已驗證
import { useNavigate } from "react-router-dom";
import {
  getTweets,
  getUserInfo,
  postTweetUnlike,
  postTweetLike,
  getSpecificTweet,
} from "api/tweets";
// 引入Modal元件
import PostTweetModal from "components/PostTweetModal/PostTweetModal";
import PostReplyModal from "components/PostReplyModal/PostReplyModal";

const MainPageInfo = () => {
  const navigate = useNavigate();
  // 從Context中拿取toggleReplyModal的function
  const {
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
    setSpecificTweet,
    handleReplyTextAreaChange,
    handleTweetReply,
  } = useContext(ModalContext);

  //先從AuthContext拿到驗證是否為true(isAuthenticated:true)
  const { isAuthenticated } = useAuth();

  //先從UserInfoContext拿到驗證是否為userInfo
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  // 如果今天mainPage的ReplyIcon被點擊的話，就要先把被點擊的specific-tweetId給存到localStorage，然後把Reply Modal給pop出來
  const handleSpecificPostReplyIconClick = (specificTweetId) => {
    const getSpecificTweetAsync = async () => {
      //因為getSpecificTweet是非同步的操作，有可能會失敗，所以我們要用try catch把它包起來
      try {
        const backendSpecificTweet = await getSpecificTweet(specificTweetId); //用await去取得所有後端specificTweet
        console.log("specificTweetId", specificTweetId);
        console.log("backendSpecificTweet", backendSpecificTweet);
        console.log(
          "Type of backendSpecificTweet: ",
          typeof backendSpecificTweet
        );
        const specificTweetArray = [];
        specificTweetArray.push(backendSpecificTweet);
        console.log(specificTweetArray);
        setSpecificTweet(specificTweetArray);
        const specificTweetArrayString = JSON.stringify(specificTweetArray);
        localStorage.setItem("specific-tweetArray", specificTweetArrayString);
      } catch (error) {
        console.error(error);
      }
    };
    getSpecificTweetAsync();
    toggleReplyModal();
  };
  //如果是文章被點擊的話，不但要存specific-tweetId，還要navigate到replyPage
  const handleNavigateToReplyPage = (specificTweetId) => {
    localStorage.setItem("specific-tweetId", specificTweetId);
    navigate("/reply");
  };

  // 導向UserOtherPage
  const handleNavigateToUserOtherPage = (userOtherId) => {
    localStorage.setItem("userOtherId", userOtherId);
    navigate("/user/other");
  };

  ////////////////////////////////////////////////////////////////////////////////////////////串接API getTweets 和  getUserInfo useEffect做初始畫面渲染 ///////////////////////////
  // const [userInfo, setUserInfo] = useState([]); //在每一頁的useEffect中會去向後端請求登入者的object資料

  //串接API: tweets畫面初始化，顯示過去tweets內所有資訊
  useEffect(() => {
    console.log("execute function in useEffect");
    //首先拿到當前登入的使用者資料
    const getUserInfoAsync = async () => {
      try {
        const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
        const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
        const userInfoId = LocalStorageUserInfo.id; //再從這個object拿到登入者的id
        //向後端拿取登入者的object資料
        const backendUserInfo = await getUserInfo(userInfoId);
        //拿到登入者資料後存在userInfo裡面，userInfo會是一個object, 給right banner用
        setUserInfo(backendUserInfo);
        // 把使用者的資訊就先全部向後端拿過來，然後存在localStorage，各頁都可以拿
        localStorage.setItem(
          "UserInfoObjectString",
          JSON.stringify(backendUserInfo)
        );
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
  }, [setTweets]); //後面的dependency是tweets和...，兩者改變就要讓愛心的數字可動態更新   tweets, userInfo

  //////////////////////////////////////////////////////////////串接API postTweetLike and postTweetUnlike：處理某篇貼文isLike的boolean值 ///////////////////////////
  // 前端畫面處理isLikedActive的state做畫面渲染
  // 喜歡功能
  const handleToggleLike = async (id) => {
    // 找出這篇文章
    const specificToggleTweet = tweets.filter((tweet) => tweet.TweetId === id);
    console.log("specificToggleTweet", specificToggleTweet);
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
              if (tweet.TweetId === id) {
                return {
                  ...tweet,
                  isLiked: false,
                  likeCount: tweet.likeCount - 1,
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
              if (tweet.TweetId === id) {
                return {
                  ...tweet,
                  isLiked: true,
                  likeCount: tweet.likeCount + 1,
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

  console.log("Main Page userInfo", userInfo);

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
          TweetId,
          description,
          authorAvatar,
          authorName,
          authorAccount,
          createdAt,
          likeCount,
          replyCount,
          isLiked,
          authorId,
        }) => {
          return (
            <>
              <div className="post-item-container" key={TweetId}>
                <div className="post-item-wrapper">
                  
                  <div className="avatar-wrapper">
                    <img
                      src={authorAvatar}
                      alt=""
                      className="post-item-avatar"
                      onClick={() => {
                        handleNavigateToUserOtherPage(authorId);
                      }}
                    />
                  </div>

                  <div className="post-item-content">
                    <div className="user-post-info">
                      <div className="name">{authorName}</div>
                      <div className="account">@{authorAccount}</div>
                      <div className="time">· {createdAt}</div>
                    </div>

                    <div
                      className="post-content"
                      onClick={() => {
                        handleNavigateToReplyPage(TweetId);
                      }}
                    >
                      {description}
                    </div>

                    <div className="reply-like-container">
                      <div className="reply-container">
                        <ReplyIcon
                          className="reply-icon"
                          onClick={() => {
                            handleSpecificPostReplyIconClick(TweetId);
                          }}
                        />
                        <div className="reply-number">{replyCount}</div>
                      </div>
                      <div className="like-container">
                        <div
                          className="like-icons"
                          onClick={() => {
                            handleToggleLike(TweetId);
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
          userInfo={userInfo}
          specificTweet={specificTweet}
        />
      )}
    </div>
  );
};

export default MainPageInfo;
