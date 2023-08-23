import { createContext, useState } from "react";

const AuthContext = createContext("");

function AuthContextProvider({ children }) {
  // toggle PostModal: postModal的boolean判斷是否要跳出postTweetModal
  const [postModal, setPostModal] = useState(false);
  const togglePostModal = () => {
    setPostModal(!postModal);
  };


  const AuthContextValueToShare = {
    postModal,
    setPostModal,
    togglePostModal,
  };

  return (
    <AuthContext.Provider value={AuthContextValueToShare}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
