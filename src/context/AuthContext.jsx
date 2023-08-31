import { createContext, useState, useEffect, useContext } from "react";
import { register, login } from "../api/auth";
import { setting } from "../api/setting";

import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";

const defaultAuthContext = {
  isAuthenticated: false, // 使用者是否登入的判斷依據，預設為 false，若取得後端的有效憑證，則切換為 true
  currentMember: null, // 當前使用者相關資料，預設為 null，成功登入後就會有使用者資料
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      } else {
        setIsAuthenticated(true);
      }
      // const result = await checkPermission(authToken);
      // if (result) {
      //   setIsAuthenticated(true);
      //   const tempPayload = jwt_decode(authToken);
      //   setPayload(tempPayload);
      // } else {
      //   setIsAuthenticated(false);
      //   setPayload(null);
      // }
    };

    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.id, 
          account: payload.account, 
        },
        register: async (data1) => {
          console.log(`進入AuthContext.jsx!`);
          const { status, data } = await register({
            name: data1.name,
            account: data1.account,
            email: data1.email,
            password: data1.password,
            checkPassword: data1.checkPassword,
          });
          console.log(
            `拿authToken中的payload資料回來塞入temPayload，但register頁面設計authToken，所以直接拿整包資料data並JSON.stringify:${JSON.stringify(
              data
            )}`
          );
          const tempPayload = JSON.stringify(data);
          const authToken = data.token
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("authToken", authToken);
            localStorage.setItem("userInfo", JSON.stringify(tempPayload));
            console.log('在localStorage存入authToken"成功註冊!"');
          } else {
            setPayload(null);
            setIsAuthenticated(false);
            console.log(`註冊失敗at authContext.jsx`);
          }
          return { status };
        },
        login: async (data1) => {
          console.log(`進入AuthContext.jsx中傳入payload(account&password) await login
          !`);
          const {data} = await login({
            account: data1.account,
            password: data1.password,
          });
          console.log(`return{data} 接收AuthContext的{data}: ${JSON.stringify(data)}`)
          const tempPayload = jwt_decode(data.data.token);
          console.log(`tempPayload: ${JSON.stringify(tempPayload)}`)
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("authToken", data.data.token);
            localStorage.setItem("userInfo", JSON.stringify(tempPayload));
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          
          return { data };

        },
        setUserInfo: async (data1) => {
          const data = await setting({
            id: data1.id,
            name: data1.name,
            account: data1.account,
            email: data1.email,
            password: data1.password,
            checkPassword: data1.checkPassword,
          });
          const tempPayload = JSON.stringify(data.data);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("userInfo", JSON.stringify(tempPayload));
            console.log('在localStorage存入更新的userInfo');
          } else {
            setPayload(null);
            setIsAuthenticated(false);
            console.log(`失敗，未更新userInfo`);
          }
          const success = data.status
          console.log(`AuthContext中的success${success}`)
          return { success };
        },
        logout: () => {
          localStorage.removeItem("authToken");
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
