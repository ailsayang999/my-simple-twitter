import { createContext, useState } from "react";
import { postTweetReply, postTweet } from "api/tweets";

const ModalContext = createContext("");

function ModalContextProvider({ children }) {
  const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
  const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
  const userInfoId = LocalStorageUserInfo.id; //再從這個object拿到登入者的id
  const [userInfo, setUserInfo] = useState([]);//在每一頁的useEffect中會去向後端請求登入者的object資料
  
  ///////////////////////////////// For Post Modal////////////////////////////////
  // toggle PostModal: postModal的boolean判斷是否要跳出postTweetModal
  const [postModal, setPostModal] = useState(false);
  const togglePostModal = () => {
    setPostModal(!postModal);
  };

  /////////////////////////////handleAddTweet  /////////////////
  const [tweets, setTweets] = useState([]);

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

  ///////////////////////////////////////For Reply Modal////////////////////////////////////
  const [replyModal, setReplyModal] = useState(false);
  const toggleReplyModal = () => {
    setReplyModal(!replyModal);
  };

  ////////////////////////////// handleTweetReply  ////////////////////////////////
  const [ReplyInputValue, setReplyInputValue] = useState("");
  const [specificTweet, setSpecificTweet] = useState([]); //這些會replyPage的時候useEffect那裡被帶入資料
  const [specificTweetReplies, setSpecificTweetReplies] = useState([]); //這些會replyPage的時候useEffect那裡被帶入資料
  //監聽器：handleReplyTextAreaChange，當PostReplyModal的textarea發生改變時，更新ReplyInputValue的state
  const handleReplyTextAreaChange = (value) => {
    setReplyInputValue(value);
  };
  //監聽器：handleTweetReply，當PostReplyModal的推文按鈕被按下時，做postTweetReply動作
  const handleTweetReply = async (ReplyInputValue, specificTweet) => {
    if (ReplyInputValue.length <= 0) {
      alert("內容不可為空白");
      return;
    }
    console.log(ReplyInputValue); //ReplyInputValue有輸入成功，handleTweetReply 點擊反應成功
    //因為他也是非同步的操作，可能會有失敗的狀況，所以我也是用try catch把它包起來
    const specificTweetIdForBackendParam = specificTweet[0].id;
    console.log("要給後端的param", specificTweetIdForBackendParam);
    console.log("要給後端的body", ReplyInputValue);

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
              replierName: res.data.userName,
              replierAvatar: res.data.userAvatar,
              replierAccount: res.data.userAccount,
              tweetBelongerAccount: res.data.authorAccount,
              createdAt: res.data.replyData.createdAt,
            },
            ...prevReplies,
          ];
        });
        toggleReplyModal();

        // 把textarea裡面的訊息清掉
        setReplyInputValue("");
        // 把PostModal關起來
        toggleReplyModal();
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  ///////////////////////////////////////For Edit Modal////////////////////////////////////
  const [editModal, setEditModal] = useState(false);
  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const ModalContextValueToShare = {
    userInfoId,
    userInfo,
    setUserInfo,
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
  };

  return (
    <ModalContext.Provider value={ModalContextValueToShare}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContextProvider };
export default ModalContext;
