// 這個檔案先留著～之後解決navigate的問題
import { createContext, useState } from "react";

const NavigationContext = createContext("");

function NavigationContextProvider({ children }) {
  // followContent要傳給UserSelfFollowPageInfo
  const [showFollowPageContent, setShowFollowPageContent] = useState("");
  // 導向UserSelfFollowPageInfo畫面使用，根據followContent，followContent= follower，但UserSelfFollowPage的navigate()會先執行，所以現在以下function只變成在UserSelfFollowPage執行
  const handleFollowerClick = (followerValue) => {
    setShowFollowPageContent(followerValue);
    console.log(showFollowPageContent);
  };

  // 導向UserSelfFollowPageInfo畫面使用，根據followContent，followContent= following，但UserSelfFollowPage的navigate()會先執行，所以現在以下function只變成在UserSelfFollowPage執行
  const handleFollowingClick = (followingValue) => {
    setShowFollowPageContent(followingValue);
    console.log(showFollowPageContent);
  };

  const NavigationContextValueToShare = {
    showFollowPageContent,
    setShowFollowPageContent,
    handleFollowingClick,
    handleFollowerClick,
  };

  return (
    <NavigationContext.Provider value={NavigationContextValueToShare}>
      {children}
    </NavigationContext.Provider>
  );
}

export { NavigationContextProvider };
export default NavigationContext;
