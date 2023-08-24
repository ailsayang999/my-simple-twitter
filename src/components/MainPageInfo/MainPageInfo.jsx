import "./mainPageInfo.scss";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";
import { useState, useContext, useEffect } from "react";
import AuthContext from "context/AuthContext";
// 之後串接用的function，之後下面那一行就可以刪掉
// import {
//   getTweets,
//   createTweets,
//   postTweetLike,
//   postTweetUnlike,
//   deleteTweets,
//   postTweet,
// } from "api/tweets";

// allTweetsDummyData和 patchTweets
import { allTweetsDummyData } from "api/tweets";

import PostTweetModal from "components/PostTweetModal/PostTweetModal";

//下面之後要串後端
import userAvatar from "assets/images/fakeUserAvatar.png";

const MainPageInfo = () => {
  // 從Context中拿取togglePostModal的function
  const { postModal, togglePostModal } = useContext(AuthContext);

  //暫時先從假資料拿
  const [tweets, setTweets] = useState(allTweetsDummyData);

  ////////////////////////////////////////////////////////////////////////////////////////////串接API getTweets ///////////////////////////

  // //串接API: tweets畫面初始化，顯示過去tweets內所有資訊
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
  // const [tweets, setTweets] = useState(tweets);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //當點擊like的時候，可以切換愛心顏色
  const [isLikedActive, setIsLikedActive] = useState(tweets.isLiked);

  const handleToggleLike = (id) => {
    setTweets((prevTweets) => {
      return prevTweets.map((tweet) => {
        if (tweet.id === id) {
          return {
            ...tweet,
            isLike: !tweet.isLike,
          };
        }
        return tweet; //其他tweet原封不動傳回去
      });
    });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////串接API postTweetLike：處理某篇貼文isLike的boolean值 ///////////////////////////

  // // 前端畫面處理isLikedActive的state做畫面渲染
  // const [isLikedActive, setIsLikedActive] = useState(tweets.isLiked);
  // // 喜歡功能
  // const handleToggleLike = async (id) => {
  //   console.log("此篇貼文的Like初始狀態: ", isLikedActive);

  //   if (isLikedActive === true) {
  //     const res = await postTweetUnlike(id);
  //     //若後端有把isLike改成false成功
  //     if (res.data) {
  //       if (res.data.message === "Unlike成功") {
  //         //把前端畫面的isLikedActive改為false做畫面渲染
  //         setIsLikedActive(false);
  //         return;
  //       }
  //     } else {
  //       return alert("Unlike未成功");
  //     }
  //   }

  //   if (isLikedActive === false) {
  //     const res = await postTweetLike(id);
  //     if (res.data) {
  //       //若喜歡喜歡成功
  //       if (res.data.status === "Like成功！") {
  //         setIsLikedActive(true);
  //         return;
  //       } else {
  //         return alert("Like成功！");
  //       }
  //     }
  //   }
  // };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////// 監聽器：handleChange /////////////////////////////////////////////////

  //監聽器：handleChange，當PostTweetModal的textarea發生改變時，更新inputValue的state
  const [inputValue, setInputValue] = useState("");

  const handleTweetTextAreaChange = (value) => {
    setInputValue(value);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleAddTweet = () => {
    if (inputValue.length > 140) {
      alert("字數不可以超過140字");
      return;
    }

    setTweets((prevTweets) => {
      return [
        {
          id: 2,
          author: {
            id: 2,
            account: "Ailsa",
            name: "ailsa",
            avatar: tweets[0].author.avatar,
          },
          description: inputValue,
          replyCount: 0,
          likeCount: 0,
          isLiked: false,
          createdAt: "2023-08-24",
        },
        ...prevTweets,
      ];
    });
    // 把textarea裡面的訊息清掉
    setInputValue("");
    // 把PostModal關起來
    togglePostModal();
  };

  const handleKeyPressAddTweet = () => {
    if (inputValue.length > 140) {
      alert("字數不可以超過140字");
      return;
    }

    setTweets((prevTweets) => {
      return [
        {
          id: 2,
          author: {
            id: 2,
            account: "Ailsa",
            name: "ailsa",
            avatar: tweets[0].author.avatar,
          },
          description: inputValue,
          replyCount: 0,
          likeCount: 0,
          isLiked: false,
          createdAt: "2023-08-24",
        },
        ...prevTweets,
      ];
    });
    // 把textarea裡面的訊息清掉
    setInputValue("");
    // 把PostModal關起來
    togglePostModal();
  };

  ///////////////////////////////////////////////// handleAddTweet handleKeyPressAddTweet /////////////////////////////////////////////////

  // //監聽器：handleAddTweet，當PostTweetModal的推文按鈕被按下時，做postTweet動作
  // const handleAddTweet = async (inputValue) => {
  //   if (inputValue.length > 140) {
  //     alert("字數不可以超過140字");
  //     return;
  //   }
  //   //因為他也是非同步的操作，可能會有失敗的狀況，所以我也是用try catch把它包起來
  //   try {
  //     //會給後端儲存的資料有：description(我們輸入的資料是inputValue)、userId、createdAt
  //     //然後因為我們是用await方法的話，我們的handleAddTweet這個函式要改成async function
  //     //我們在postTweet裡面給payload，也就是給我們想要新增的資訊，在api的tweets.js那裡就會去處理並return後端新增資料後的res.data，然後我們把這個res.data存到data裡面，再用setTweets來更新React裡面的tweets的state
  //     const data = await postTweet({
  //       description: inputValue,
  //       userId: 1,
  //       createdAt: "2023-08-19T15:35:14.000Z",
  //     });

  //     //因為後端其實會實際幫我們generate實際的todo id，所以我們拿到data的時候，我們可以在setTweets的id那裡帶入後端幫我們產生的id，然後其他資料(如：author,description..)都可以直接從後端建立好並傳來的data拿值
  //     // 前端畫面也更新：我們會帶上isLiked這個欄位，我們先給他false的值
  //     setTweets((prevTweets) => {
  //       return [
  //         {
  //           id: data.id,
  //           author: {
  //             id: data.author.id,
  //             account: data.author.account,
  //             name: data.author.name,
  //             avatar: data.author.avatar,
  //           },
  //           description: data.description,
  //           replyCount: data.replyCount,
  //           likeCount: data.likeCount,
  //           isLiked: false,
  //           createdAt: data.createdAt,
  //         },
  //         ...prevTweets,
  //       ];
  //     });
  //     togglePostModal();
  //     alert("推文發送成功!! \n請回首頁看您新增的推文~");

  //     // 把textarea裡面的訊息清掉
  //     setInputValue("");
  //     // 把PostModal關起來
  //     togglePostModal();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // //監聽器：handleKeyPressAddTweet （跟handleAddTweet同理），當PostTweetModal的感測到keyboard enter
  // const handleKeyPressAddTweet = async (inputValue) => {
  //   if (inputValue.length > 140) {
  //     alert("字數不可以超過140字");
  //     return;
  //   }

  //   //因為他也是非同步的操作，可能會有失敗的狀況，所以我也是用try catch把它包起來
  //   try {
  //     //會給後端儲存的資料有：description(我們輸入的資料是inputValue)、userId、createdAt
  //     //然後因為我們是用await方法的話，我們的handleAddTweet這個函式要改成async function
  //     //我們在postTweet裡面給payload，也就是給我們想要新增的資訊，在api的tweets.js那裡就會去處理並return後端新增資料後的res.data，然後我們把這個res.data存到data裡面，再用setTweets來更新React裡面的tweets的state
  //     const data = await postTweet({
  //       description: inputValue,
  //       userId: 1,
  //       createdAt: "2023-08-19T15:35:14.000Z",
  //     });

  //     //因為後端其實會實際幫我們generate實際的todo id，所以我們拿到data的時候，我們可以在setTweets的id那裡帶入後端幫我們產生的id，然後其他資料(如：author,description..)都可以直接從後端建立好並傳來的data拿值
  //     // 前端畫面也更新：我們會帶上isLiked這個欄位，我們先給他false的值
  //     setTweets((prevTweets) => {
  //       return [
  //         ...prevTweets,
  //         {
  //           id: data.id,
  //           author: {
  //             id: data.author.id,
  //             account: data.author.account,
  //             name: data.author.name,
  //             avatar: data.author.avatar,
  //           },
  //           description: data.description,
  //           replyCount: data.replyCount,
  //           likeCount: data.likeCount,
  //           isLiked: false,
  //           createdAt: data.createdAt,
  //         },
  //       ];
  //     });

  //     // 把textarea裡面的訊息清掉
  //     setInputValue("");
  //     // 把PostModal關起來
  //     togglePostModal();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
                        <div
                          className="like-icons"
                          onClick={() => {
                            handleToggleLike(id);
                          }}
                        >
                          <LikeIcon
                            className={`like-icon ${
                              !isLikedActive ? "like-gray" : ""
                            }`}
                          />
                          <LikeActiveIcon
                            className={`liked-icon ${
                              isLikedActive ? "like-active" : ""
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
          inputValue={inputValue}
          onTweetTextAreaChange={handleTweetTextAreaChange}
          onAddTweet={handleAddTweet}
          onKeyKeyPressAddTweet={handleKeyPressAddTweet}
        />
      )}
    </div>
  );
};

export default MainPageInfo;
