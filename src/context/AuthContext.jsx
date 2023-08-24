import { createContext, useState } from "react";

const AuthContext = createContext("");

function AuthContextProvider({ children }) {
  // toggle PostModal: postModal的boolean判斷是否要跳出postTweetModal
  const [postModal, setPostModal] = useState(false);
  const togglePostModal = () => {
    setPostModal(!postModal);
  };
  const [replyModal, setReplyModal] = useState(false);
  const toggleReplyModal = () => {
    setReplyModal(!replyModal);
  };

  const AuthContextValueToShare = {

  };

  return (
    <AuthContext.Provider value={AuthContextValueToShare}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
