// 更改後端Liked的問題還沒解決，還沒有登入者對某篇貼文isLike的boolean值，要在handleLikeClick那裡處理
import "./mainPageInfo.scss";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";
import { useState, useContext, useEffect } from "react";
import AuthContext from "context/AuthContext";
// 之後串接用的function，之後下面那一行就可以刪掉
// import { getTweets, createTweets, patchTweets, deleteTweets } from "api/tweets";

// allTweetsDummyData和 patchTweets
import { allTweetsDummyData, patchTweets } from "api/tweets";

import PostTweetModal from "components/PostTweetModal/PostTweetModal";

//下面之後要串後端
import userAvatar from "assets/images/fakeUserAvatar.png";

const MainPageInfo = () => {
  // 從Context中拿取togglePostModal的function
  const { postModal, togglePostModal } = useContext(AuthContext);

  //暫時先從假資料拿
  const [tweets, setTweets] = useState(allTweetsDummyData);

  //當點擊like的時候，可以切換愛心顏色
  const [likeActive, setLikeActive] = useState();

  const handleLikeClick = (id) => {
    setLikeActive(!likeActive);
    //之後後端資料進來要改這裡，要把後端的like資料改掉
    // setTweets({ ...tweets, likeCount: nextLikeCount++  });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////串接API getTweets ///////////////////////////

  // //串接API: 從後端拿到我們所有tweets 資料後會更新 tweets 的state，畫面會重新更新
  // useEffect(() => {
  //   const getTweetsAsync = async () => {
  //     //因為getTweets是非同步的操作，有可能會失敗，所以我們要用try catch把它包起來
  //     try {
  //       const tweets = await getTweets(); //用await去取得所有後端tweets的項目
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   //getTweetsAsync這個function定義完成之後，我們可以直接執行它
  //   getTweetsAsync();
  // }, []); //後面的dependency讓他是空的，因為只要在畫面一開始被渲染的時候才做操作

  ////////////////////////////////////////////////////////////////////////////////////////////串接API getTweets ///////////////////////////

  return (
    <div className="main-page-info">
      {/* 感覺以下可以重複使用 */}
      <div className="header-container">
        <header>
          <h4>{"首頁"}</h4>
        </header>
      </div>
      {/* Post Area */}
      <div className="post-area-wrapper">
        <div className="post-area-container">
          <div className="posting-area">
            <img src={userAvatar} alt="" className="user-avatar" />
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

      {/* Render All Tweet Items With map */}
      {tweets.map(
        ({ id, description, author, createAt, likeCount, replyCount }) => {
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
                      <div className="time">· {createAt}</div>
                    </div>

                    <div className="post-content">{description}</div>

                    <div className="reply-like-container">
                      <div className="reply-container">
                        <ReplyIcon className="reply-icon" />
                        <div className="reply-number">{replyCount}</div>
                      </div>
                      <div className="like-container">
                        <div
                          className="like-icons"
                          onClick={() => {
                            handleLikeClick(id);
                          }}
                        >
                          <LikeIcon
                            className={`like-icon ${
                              !likeActive ? "like-gray" : ""
                            }`}
                          />
                          <LikeActiveIcon
                            className={`liked-icon ${
                              likeActive ? "like-active" : ""
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
      {postModal && <PostTweetModal />}
    </div>
  );
};

export default MainPageInfo;
