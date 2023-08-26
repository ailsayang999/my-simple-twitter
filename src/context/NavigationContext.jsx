import { createContext, useState } from "react";

const NavigationContext = createContext("");

function NavigationContextProvider({ children }) {
  // followContent要傳給UserSelfFollowPageInfo
  const [followContent, setFollowContent] = useState("follower");
  // 導向UserSelfFollowPageInfo畫面使用，根據followContent，followContent= following
  const handleFollowingClick = (followingValue) => {
    setFollowContent(followingValue);
  
    console.log(followContent);
  };
  // 導向UserSelfFollowPageInfo畫面使用，根據followContent，followContent= follower
  const handleFollowerClick = (followerValue) => {
    setFollowContent(followerValue);
  
    console.log(followContent);
  };

  const NavigationContextValueToShare = {
    followContent,
    setFollowContent,
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
