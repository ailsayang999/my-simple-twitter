import { createContext, useState, useContext } from "react";

const UserInfoContext = createContext("");

const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState("test test userInfo"); //在每一頁的useEffect中會去向後端請求登入者的object資料

  const UserInfoContextValueToShare = {
    userInfo,
    setUserInfo,
  };

  return (
    <UserInfoContext.Provider value={UserInfoContextValueToShare}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);
export { UserInfoProvider };
export default UserInfoContext;
