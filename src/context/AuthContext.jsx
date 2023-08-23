import { createContext, useContext, useState } from "react";

const AuthContext = createContext("");

// 輸出自製useAuthContext的Hook，在每一個直接使用取值，這樣就不用每一個component都要寫useContext和引入AuthContext
// export const useAuthContext = () => useContext(AuthContext);


function AuthContextProvider({ children }) {
  // toggle PostModal: postModal的boolean判斷是否要跳出postTweetModal
  const [postModal, setPostModal] = useState(false);
  const togglePostModal = () => {
    setPostModal(!postModal);
  };

  const AuthContextValueToShare = { postModal, setPostModal, togglePostModal };
  
  return (
    <AuthContext.Provider value={AuthContextValueToShare}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;