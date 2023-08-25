import { createContext, useState } from "react";

const NavigationContext = createContext("");

function NavigationContextProvider({ children }) {
  // followContent要傳給UserSelfFollowPageInfo
  const [followContent, setFollowContent] = useState("");

  const NavigationContextValueToShare = {
    followContent,
    setFollowContent,
  };

  return (
    <NavigationContext.Provider value={NavigationContextValueToShare}>
      {children}
    </NavigationContext.Provider>
  );
}

export { NavigationContextProvider };
export default NavigationContext;
