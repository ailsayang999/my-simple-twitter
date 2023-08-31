import { createContext, useState, useEffect, useContext } from "react";
import { getUserInfo } from "api/tweets";

const UserInfoContext = createContext("");

const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState("hahahha"); //在每一頁的useEffect中會去向後端請求登入者的object資料

  // useEffect(() => {
  //   console.log("execute UserInfoContext function in useEffect");

  //   const localStorageUserInfoString = localStorage.getItem("userInfo"); //拿下來會是一比string的資料
  //   const LocalStorageUserInfo = JSON.parse(localStorageUserInfoString); // 要把這個string變成object
  //   const userInfoId = LocalStorageUserInfo.id; //再從這個object拿到登入者的id
  //   console.log("User Info Context userInfoId", userInfoId)

  //   //首先拿到當前登入的使用者資料
  //   const getUserInfoAsync = async () => {
  //     try {
  //       //向後端拿取登入者的object資料
  //       const backendUserInfo = await getUserInfo(userInfoId);
  //       //拿到登入者資料後存在userInfo裡面，backendUserInfo會是一個object
  //       setUserInfo(backendUserInfo);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getUserInfoAsync();
  // }, []);

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
