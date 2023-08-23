import { createContext, useState } from "react";

// 暫先給allTweetsDummyData人像資料
import otherAvatar from "assets/images/fakeUserOtherAvatar.png";

const AuthContext = createContext("");

function AuthContextProvider({ children }) {
  // toggle PostModal: postModal的boolean判斷是否要跳出postTweetModal
  const [postModal, setPostModal] = useState(false);
  const togglePostModal = () => {
    setPostModal(!postModal);
  };

  //前台allTweetsDummyData
  const allTweetsDummyData = [
    {
      id: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti temporibus porro dolore, praesentium assumenda. Ea, asperiores! Ut, natus ad?",
      createAt: "2023-08-22",
      likeCount: 1,
      replyCount: 1,
      author: { id: 1, name: "User1", account: "user1", avatar: otherAvatar },
    },
  ];

  // 前台allTweets的state
  const [allTweets, setAllTweets] = useState(allTweetsDummyData);


  const AuthContextValueToShare = {
    postModal,
    setPostModal,
    togglePostModal,
    allTweetsDummyData,
    allTweets,
    setAllTweets,
  };

  return (
    <AuthContext.Provider value={AuthContextValueToShare}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
