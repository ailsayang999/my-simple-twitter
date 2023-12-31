import { createContext, useState } from "react";
import { postTweetReply, postTweet, dummyTweets } from "api/tweets";
import { useNavigate } from "react-router-dom";
const ModalContext = createContext("");

function ModalContextProvider({ children }) {
  const navigate = useNavigate();
  const dummySpecificTweet = [
    {
      id: 0,
      authorId: 0,
      authorAccount: "user1",
      authorName: "User1",
      authorAvatar:
        "https://loremflickr.com/320/240/man/?random=22.488061823126504",
      description: "",
      likeCount: 0,
      replyCount: 0,
      isLiked: true,
      createdAt: "2023-08-28T10:09:15.000Z",
    },
  ];
  const [postModal, setPostModal] = useState(false); // toggle PostModal: postModal的boolean判斷是否要跳出postTweetModal
  const [replyModal, setReplyModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  // handleAddTweet
  const [tweets, setTweets] = useState("");
  const [specificTweet, setSpecificTweet] = useState(dummySpecificTweet); //這些會replyPage的時候useEffect那裡被帶入資料
  const [specificTweetReplies, setSpecificTweetReplies] = useState([]); //這些會replyPage的時候useEffect那裡被帶入資料

  // handleTweetTextAreaChange
  const [inputValue, setInputValue] = useState("");
  // handleReplyTextAreaChange
  const [ReplyInputValue, setReplyInputValue] = useState("");

  //監聽器：handleChange，當PutEditUserSelfInfoModal的edit-name-input發生改變時，更新editNameInput的state
  const [editNameInputValue, setEditNameInputValue] = useState("");
  //監聽器：handleChange，當PutEditUserSelfInfoModal的edit-intro-input發生改變時，更新editIntroInput的state
  const [editIntroInputValue, setEditIntroInputValue] = useState("");

  // handleTweetTextAreaChange，當PostTweetModal的textarea發生改變時，更新inputValue的state
  const handleTweetTextAreaChange = (value) => {
    setInputValue(value);
  };
  //監聽器：handleReplyTextAreaChange，當PostReplyModal的textarea發生改變時，更新ReplyInputValue的state
  const handleReplyTextAreaChange = (value) => {
    setReplyInputValue(value);
  };

  //監聽器：handleChange，當PutEditUserSelfInfoModal的edit-name-input發生改變時，更新editNameInput的state
  const handleEditNameInputChange = (value) => {
    setEditNameInputValue(value);
  };
  //監聽器：handleChange，當PutEditUserSelfInfoModal的edit-intro-input發生改變時，更新editIntroInput的state
  const handleEditIntroInputChange = (value) => {
    setEditIntroInputValue(value);
  };

  //監聽器：handleAddTweet，當PostTweetModal的推文按鈕被按下時，做postTweet動作
  const handleAddTweet = async (inputValue, userInfo) => {
    if (inputValue.length > 140) {
      alert("字數不可以超過140字");
      return;
    }

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
              authorAvatar: userInfo.avatar,
            },
            ...prevTweets,
          ];
        });
        // 把PostModal關起來
        togglePostModal();
        navigate("/main");
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };
  //監聽器：handleTweetReply，當PostReplyModal的推文按鈕被按下時，做postTweetReply動作
  const handleTweetReply = async (ReplyInputValue, specificTweet) => {
    if (ReplyInputValue.length === 0) {
      alert("內容不可為空白");
      return;
    }
    if (ReplyInputValue.length > 140) {
      alert("文字上限140字");
      return;
    }

    // console.log(ReplyInputValue); //ReplyInputValue有輸入成功，handleTweetReply 點擊反應成功
    //因為他也是非同步的操作，可能會有失敗的狀況，所以我也是用try catch把它包起來
    const specificTweetIdForBackendParam = specificTweet[0].id;
    // console.log("要給後端的param", specificTweetIdForBackendParam);
    // console.log("要給後端的body", ReplyInputValue);

    try {
      //會給後端儲存的資料有：description
      //然後因為我們是用await方法的話，我們的handleAddTweet這個函式要改成async function
      //我們在postTweet裡面給payload，也就是給我們想要新增的資訊，在api的tweets.js那裡就會去處理並return後端新增資料後的res.data，然後我們把這個res.data存到data裡面，再用setTweets來更新React裡面的tweets的state
      const res = await postTweetReply(
        {
          comment: ReplyInputValue,
        },
        specificTweetIdForBackendParam
      );

      //因為後端其實會實際幫我們generate實際的todo id，所以我們拿到data的時候，我們可以在setTweets的id那裡帶入後端幫我們產生的id，然後其他資料(如：author,description..)都可以直接從後端建立好並傳來的data拿值
      // 前端畫面也更新：我們會帶上isLiked這個欄位，我們先給他false的值

      if (res.data.status === "success") {
        alert(res.data.message);
        setSpecificTweetReplies((prevReplies) => {
          return [
            {
              replyId: res.data.replyData.id,
              comment: res.data.replyData.comment,
              replierName: res.data.replyData.userName,
              replierAvatar: res.data.replyData.userAvatar,
              replierAccount: res.data.replyData.userAccount,
              tweetBelongerAccount: res.data.replyData.authorAccount,
              createdAt: res.data.replyData.createdAt,
            },
            ...prevReplies,
          ];
        });

        // 把PostModal關起來
        toggleReplyModal();

        // 把前端main Page畫面replyCount更新
        const newTweetReplyNumArr = tweets.map((tweet) => {
          if (tweet.TweetId === specificTweet[0].id) {
            return {
              ...tweet,
              replyCount: tweet.replyCount + 1,
            };
          } else {
            return tweet;
          }
        });
        setTweets(newTweetReplyNumArr);
        // 把前端reply Page畫面replyCount更新
        const newSpecificTweetReplyNumArr = specificTweet.map(
          (specificTweetObject) => {
            if (specificTweetObject.id === specificTweet[0].id) {
              return {
                ...specificTweetObject,
                replyCount: specificTweetObject.replyCount + 1,
              };
            } else {
              return specificTweetObject;
            }
          }
        );
        setSpecificTweet(newSpecificTweetReplyNumArr);
        // console.log(newSpecificTweetReplyNumArr);
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  ///////////////////////////////////////  切換關起與跳出動作 並Toggle的時候就把內容清空 ////////////////////////////
  const toggleReplyModal = () => {
    setReplyModal(!replyModal);
    setReplyInputValue(""); // 把input內容清空
  };
  const togglePostModal = () => {
    setPostModal(!postModal);
    setInputValue(""); // 把input內容清空
  };

  ///////////////////////////////////////For Edit Modal////////////////////////////////////
  const toggleEditModal = () => {
    setEditModal(!editModal);
    setEditNameInputValue("")
    setEditIntroInputValue("");
  };

  const ModalContextValueToShare = {
    tweets,
    setTweets,
    postModal,
    setPostModal,
    togglePostModal,
    inputValue,
    setInputValue,
    handleTweetTextAreaChange,
    handleAddTweet,
    replyModal,
    setReplyModal,
    toggleReplyModal,
    ReplyInputValue,
    setReplyInputValue,
    specificTweet,
    setSpecificTweet,
    specificTweetReplies,
    setSpecificTweetReplies,
    handleReplyTextAreaChange,
    handleTweetReply,
    editModal,
    setEditModal,
    toggleEditModal,
    editNameInputValue,
    setEditNameInputValue,
    editIntroInputValue,
    setEditIntroInputValue,
    handleEditNameInputChange,
    handleEditIntroInputChange,
  };

  return (
    <ModalContext.Provider value={ModalContextValueToShare}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContextProvider };
export default ModalContext;
