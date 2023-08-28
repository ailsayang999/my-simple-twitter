import "./mainPageInfo.scss";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";
import { useState, useContext, useEffect } from "react";
import ModalContext from "context/ModalContext";
import { useAuth } from "context/AuthContext"; //到AuthContext拿是否已驗證
import { useNavigate } from "react-router-dom";
import {
  getTweets,
  getUserInfo,
  postTweetUnlike,
  postTweetLike,
  postTweet,
} from "api/tweets";
//製作假的authToken

// 引入Modal元件
import PostTweetModal from "components/PostTweetModal/PostTweetModal";
import PostReplyModal from "components/PostReplyModal/PostReplyModal";

const MainPageInfo = () => {
  const navigate = useNavigate();
  const handleNavigateToReplyPage = () => {
    navigate("/reply");
  };

  // 導向UserOtherPage
  const handleNavigateToUserOtherPage = () => {
    navigate("/user/other");
  };

  // 從Context中拿取togglePostModal的function
  const { postModal, togglePostModal } = useContext(ModalContext);

  // 從Context中拿取toggleReplyModal的function
  const { replyModal, toggleReplyModal } = useContext(ModalContext);

  //先從AuthContext拿到驗證是否為true(isAuthenticated:true)
  const { isAuthenticated } = useAuth();

  ////////////////////////////////////////////////////////////////////////////////////////////串接API getTweets 和  getUserInfo useEffect做初始畫面渲染 ///////////////////////////
  const [userInfo, setUserInfo] = useState([]);
  const [tweets, setTweets] = useState([]);

  //串接API: tweets畫面初始化，顯示過去tweets內所有資訊
  useEffect(() => {
    //首先拿到當前登入的使用者資料
    const getUserInfoAsync = async () => {
      try {
        const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
        const userInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
        const userInfoId = userInfo.id; //再從這個object那到登入者的id
        const backendUserInfo = await getUserInfo(userInfoId);
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
  }, []); //後面的dependency讓他是空的，因為只要在畫面一開始被渲染的時候才做操作

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

  ///////////////////////////////////////////////// handleAddTweet handleKeyPressAddTweet /////////////////////////////////////////////////
  // 監聽器：handleTweetTextAreaChange，當PostTweetModal的textarea發生改變時，更新inputValue的state
  const [inputValue, setInputValue] = useState("");
  const handleTweetTextAreaChange = (value) => {
    setInputValue(value);
  };

  //監聽器：handleAddTweet，當PostTweetModal的推文按鈕被按下時，做postTweet動作
  const handleAddTweet = async (inputValue, userAvatar) => {
    if (inputValue.length > 140) {
      alert("字數不可以超過140字");
      return;
    }
    console.log(inputValue); //inputValue有輸入成功，handleAddTweet 點擊反應成功
    console.log({
      description: inputValue,
    });
    //因為他也是非同步的操作，可能會有失敗的狀況，所以我也是用try catch把它包起來
    try {
      //會給後端儲存的資料有：description
      //然後因為我們是用await方法的話，我們的handleAddTweet這個函式要改成async function
      //我們在postTweet裡面給payload，也就是給我們想要新增的資訊，在api的tweets.js那裡就會去處理並return後端新增資料後的res.data，然後我們把這個res.data存到data裡面，再用setTweets來更新React裡面的tweets的state
      const res = await postTweet({
        description: inputValue,
      });

      //因為後端其實會實際幫我們generate實際的todo id，所以我們拿到data的時候，我們可以在setTweets的id那裡帶入後端幫我們產生的id，然後其他資料(如：author,description..)都可以直接從後端建立好並傳來的data拿值
      // 前端畫面也更新：我們會帶上isLiked這個欄位，我們先給他false的值

      if (res.data.status === "success") {
        alert(res.data.message);
        console.log(res.data.data.description);
        setTweets((prevTweets) => {
          return [
            {
              id: res.data.data.id,
              authorAccount: userInfo.account,
              description: res.data.data.description,
              replyCount: 0,
              likeCount: 0,
              isLiked: false,
              createdAt: res.data.data.createdAt,
              authorAvatar: userAvatar,
            },
            ...prevTweets,
          ];
        });
        togglePostModal();

        // 把textarea裡面的訊息清掉
        setInputValue("");
        // 把PostModal關起來
        togglePostModal();
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  ///////////////////////////////////////////////// handleAddTweet handleKeyPressAddTweet /////////////////////////////////////////////////

  //監聽器：handleChange，當PostTweetModal的textarea發生改變時，更新inputValue的state
  const [ReplyInputValue, setReplyInputValue] = useState("");

  const handleReplyTextAreaChange = (value) => {
    setReplyInputValue(value);
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
                      onClick={handleNavigateToReplyPage}
                    >
                      {description}
                    </div>

                    <div className="reply-like-container">
                      <div className="reply-container">
                        <ReplyIcon
                          className="reply-icon"
                          onClick={toggleReplyModal}
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

      {/* Modal ：根據replyModal的布林值決定是否要跳出PostReplyModal component*/}
      {replyModal && (
        <PostReplyModal
          ReplyInputValue={ReplyInputValue}
          onReplyTextAreaChange={handleReplyTextAreaChange}
          // onAddTweetReply={handleAddTweetReply} 還沒做好
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

export default MainPageInfo;
