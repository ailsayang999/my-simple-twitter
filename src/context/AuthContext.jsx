import { createContext, useState, useEffect, useContext } from "react";
import { register, login, checkPermission } from "../api/auth";

// import * as jwt from 'jsonwebtoken';
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
      }
      const result = await checkPermission(authToken);
      if (result) {
        setIsAuthenticated(true);
        const tempPayload = jwt_decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };

    checkTokenIsValid();
    // 一旦 pathname 有改變，就需要重新驗證 token，因此需要使用 useEffect，而 dependency 參數需要設定為 pathname
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.id, // 取出 sub 字串，可以做為使用者 id
          name: payload.account, // 取出使用者帳號
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
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("authToken", "成功註冊!");
            localStorage.setItem("userInfo", JSON.stringify(tempPayload));
            console.log('在localStorage存入authToken"成功註冊!"');
          } else {
            setPayload(null);
            setIsAuthenticated(false);
            console.log(`註冊失敗at authContext.jsx`);
          }
          // return success; 沒有架設success:true
          return { status };
        },
        login: async (data1) => {
          console.log(`進入AuthContext.jsx中傳入payload(account&password) await login
          !`);
          const { success, authToken, data } = await login({
            account: data1.account,
            password: data1.password,
          });
          console.log(
            `解構賦值拿回success:${success} authToken:${authToken} 多拿一個data確認後端內容:${data}`
          );
          const tempPayload = jwt_decode(authToken);
          console.log(
            `使用jwt_decode轉tempPayload回JSON格式:${JSON.stringify(
              tempPayload
            )}`
          );
          console.log(`使用jwt_decode轉authToken回JSON格式:${authToken}`);

          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            console.log(`設定isAuthenticated為true`);
            localStorage.setItem("authToken", authToken);
            localStorage.setItem("userInfo", JSON.stringify(tempPayload));
            console.log(`將authToken存入localStorage`);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
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
