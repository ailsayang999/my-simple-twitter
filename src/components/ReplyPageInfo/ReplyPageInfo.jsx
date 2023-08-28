import "./replyPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext"; //到AuthContext拿是否已驗證
import { useContext, useState, useEffect } from "react";
import ModalContext from "context/ModalContext";
import {
  postTweetReply,
  getUserInfo,
  getSpecificTweet,
  getSpecificTweetReply,
  postTweetUnlike,
  postTweetLike,
} from "api/tweets";

//下面userAvatar之後要串後端
import userAvatar from "assets/images/fakeUserAvatar.png";
import { replyItemsDummyData } from "api/tweets";

// 引入Modal元件
import PostReplyModal from "components/PostReplyModal/PostReplyModal";

// 元件切分
const ReplyPost = ({ specificTweet, toggleReplyModal }) => {
  const [specificTweetItem, setSpecificTweetItem] = useState(specificTweet);
  
  // 前端畫面處理isLikedActive的state做畫面渲染
  // 喜歡功能
  const handleToggleLike = async (id) => {
    // 拿到這篇文章Like初始狀態
    const specificToggleTweetLike = specificTweetItem.isLiked;
    console.log("此篇貼文的Like初始狀態: ", specificToggleTweetLike);

    if (specificToggleTweetLike === true) {
      const res = await postTweetUnlike(id);
      //若後端有把isLike改成false成功
      if (res.data) {
        if (res.data.status === "success") {
          //把前端畫面的isLiked改為false做畫面渲染
          setSpecificTweetItem({ ...specificTweetItem, isLike: false });
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
          setSpecificTweetItem({ ...specificTweetItem, isLike: true });
          alert("Like成功");
          return;
        } else {
          return alert("Like未成功！");
        }
      }
    }
  };

  return (
    <>
      <div className="reply-post">
        <div className="tweet-area-wrapper">
          <div className="tweet-area-container">
            <div className="tweet-author-area">
              <img
                src={specificTweet.authorAvatar}
                alt=""
                className="author-avatar"
              />
              <div className="tweet-account-name-area">
                <div className="tweet-author-name">
                  {specificTweet.authorName}
                </div>
                <div className="tweet-author-account">
                  @{specificTweet.authorAaccount}
                </div>
              </div>
            </div>
            <div className="tweet-text-area">{specificTweet.description}</div>
            <div className="tweet-time-area">
              <div className="tweet-time">{specificTweet.createdAt}</div>
            </div>
          </div>
        </div>
        <div className="reply-like-area-wrapper">
          <div className="reply-like-area">
            <div className="reply-count">
              <div className="reply-num">{specificTweet.replyCount}</div>
              <div className="reply-text">回覆</div>
            </div>
            <div className="like-count">
              <div className="like-num">{specificTweet.likeCount}</div>
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
                handleToggleLike(specificTweet.id);
              }}
            >
              <LikeIcon
                className={`tweet-like-icon ${
                  !specificTweet.isLiked ? "like-gray" : ""
                }`}
              />
              <LikeActiveIcon
                className={`tweet-liked-icon ${
                  specificTweet.isLiked ? "like-active" : ""
                }`}
              />
            </div>
            {/* <LikeIcon className="tweet-like-icon" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

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
  const { replyModal, toggleReplyModal } = useContext(ModalContext);

  //先從AuthContext拿到驗證是否為true(isAuthenticated:true)
  const { isAuthenticated } = useAuth();

  //串接API: reply畫面初始化，顯示過去特定貼文內所有reply
  const [userInfo, setUserInfo] = useState([]);
  const [specificTweet, setSpecificTweet] = useState([]);
  const [specificTweetReplies, setSpecificTweetReplies] = useState([]);

  // 先把mainPage的某個一個特定tweet的id拿出來
  const specificTweetId = localStorage.getItem("specific-tweetId");
  // console.log(typeof specificTweetId);
  const specificTweetIdNum = Number(specificTweetId);

  // 先拿到初始的資料
  useEffect(() => {
    //首先拿到當前登入的使用者資料
    const getUserInfoAsync = async () => {
      try {
        const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
        const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
        const userInfoId = LocalStorageUserInfo.id; //再從這個object那到登入者的id
        const backendUserInfo = await getUserInfo(userInfoId);
        setUserInfo(backendUserInfo);
      } catch (error) {
        console.error(error);
      }
    };
    //拿到被點擊的貼文資料
    const getSpecificTweetAsync = async () => {
      //因為getSpecificTweet是非同步的操作，有可能會失敗，所以我們要用try catch把它包起來
      try {
        const backendSpecificTweet = await getSpecificTweet(specificTweetIdNum); //用await去取得所有後端specificTweet
        setSpecificTweet(backendSpecificTweet[0]);
      } catch (error) {
        console.error(error);
      }
    };
    // 再來是拿這篇文的所有回覆
    const getSpecificTweetReplyAsync = async () => {
      try {
        const backendSpecificTweetReplies = await getSpecificTweetReply(
          specificTweetIdNum
        );
        setSpecificTweetReplies(backendSpecificTweetReplies);
      } catch (error) {
        console.error(error);
      }
    };

    getSpecificTweetAsync();
    //getUserInfoAsync和getSpecificTweetAsync這些function定義完成之後，我們可以直接執行它
    getUserInfoAsync();
    getSpecificTweetReplyAsync();
  }, []); //後面的dependency讓他是空的，因為只要在畫面一開始被渲染的時候才做操作

  console.log(specificTweet);

  //  console.log(specificTweetReplies);

  ///////////////////////////////////////////////// handleTweetReply  /////////////////////////////////////////////////
  //監聽器：handleReplyTextAreaChange，當PostReplyModal的textarea發生改變時，更新ReplyInputValue的state
  const [ReplyInputValue, setReplyInputValue] = useState("");
  const handleReplyTextAreaChange = (value) => {
    setReplyInputValue(value);
  };
  //監聽器：handleTweetReply，當PostReplyModal的推文按鈕被按下時，做postTweetReply動作
  // const handleTweetReply = async (ReplyInputValue, tweetId, userAvatar) => {
  //   if (ReplyInputValue.length > 140) {
  //     alert("字數不可以超過140字");
  //     return;
  //   }
  //   console.log(ReplyInputValue); //ReplyInputValue有輸入成功，handleTweetReply 點擊反應成功
  //   console.log({
  //     comment: ReplyInputValue,
  //   });
  //   //因為他也是非同步的操作，可能會有失敗的狀況，所以我也是用try catch把它包起來
  //   try {
  //     //會給後端儲存的資料有：description
  //     //然後因為我們是用await方法的話，我們的handleAddTweet這個函式要改成async function
  //     //我們在postTweet裡面給payload，也就是給我們想要新增的資訊，在api的tweets.js那裡就會去處理並return後端新增資料後的res.data，然後我們把這個res.data存到data裡面，再用setTweets來更新React裡面的tweets的state
  //     const res = await postTweetReply(
  //       {
  //         comment: ReplyInputValue,
  //       },
  //       tweetId
  //     );

  //     //因為後端其實會實際幫我們generate實際的todo id，所以我們拿到data的時候，我們可以在setTweets的id那裡帶入後端幫我們產生的id，然後其他資料(如：author,description..)都可以直接從後端建立好並傳來的data拿值
  //     // 前端畫面也更新：我們會帶上isLiked這個欄位，我們先給他false的值

  //     if (res.data.status === "success") {
  //       alert(res.data.message);
  //       console.log(res.data.replyData.comment);
  //       setReplies((prevReplies) => {
  //         return [
  //           {
  //             id: res.data.replyData.id,
  //             authorAccount: userInfo.account,
  //             description: res.data.data.description,
  //             createdAt: res.data.replyData.createdAt,
  //             authorAvatar: userAvatar,
  //           },
  //           ...prevReplies,
  //         ];
  //       });
  //       toggleReplyModal();

  //       // 把textarea裡面的訊息清掉
  //       setReplyInputValue("");
  //       // 把PostModal關起來
  //       toggleReplyModal();
  //     }
  //     return;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="reply-page-info">
      {/* 以下header可以重複使用 */}
      <div className="header-container">
        <BackArrowIcon
          className="back-arrow-icon"
          onClick={handleBackArrowClick}
        />
        <h4 className="header-title">推文</h4>
      </div>

      {/* Render reply Post */}
      <ReplyPost
        toggleReplyModal={toggleReplyModal}
        specificTweet={specificTweet}
      />

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
          // onTweetReply={handleTweetReply}
          userInfo={userInfo}
          userAvatar={userInfo.avatar}
        />
      )}
    </div>
  );
};

export default ReplyPageInfo;
