import { createContext, useState } from "react";
import { postTweetReply, postTweet } from "api/tweets";

const ModalContext = createContext("");

function ModalContextProvider({ children }) {
  // toggle PostModal: postModal的boolean判斷是否要跳出postTweetModal
  const [postModal, setPostModal] = useState(false);
  const togglePostModal = () => {
    setPostModal(!postModal);
  };
  const [replyModal, setReplyModal] = useState(false);
  const toggleReplyModal = () => {
    setReplyModal(!replyModal);
  };

  ///////////////////////////////////////////////// handleTweetReply  /////////////////////////////////////////////////

  const [ReplyInputValue, setReplyInputValue] = useState("");
  const [specificTweet, setSpecificTweet] = useState([]);
  const [specificTweetReplies, setSpecificTweetReplies] = useState([]);
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


  

  const [editModal, setEditModal] = useState(false);
  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const ModalContextValueToShare = {
    postModal,
    setPostModal,
    togglePostModal,
    replyModal,
    setReplyModal,
    toggleReplyModal,
    editModal,
    setEditModal,
    toggleEditModal,
    ReplyInputValue,
    setReplyInputValue,
    specificTweet,
    setSpecificTweet,
    specificTweetReplies,
    setSpecificTweetReplies,
    handleReplyTextAreaChange,
    handleTweetReply,
  };

  return (
    <ModalContext.Provider value={ModalContextValueToShare}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContextProvider };
export default ModalContext;
