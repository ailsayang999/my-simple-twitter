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
          const { data } = await register({
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
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return { data };
        },
        login: async (data1) => {
          console.log(`進入AuthContext.jsx中傳入payload(account&password) await login
          !`);
          const {data} = await login({
            account: data1.account,
            password: data1.password,
          });
          if (data.status === "success") {
            const tempPayload = jwt_decode(data.data.token);
            console.log(`tempPayload: ${JSON.stringify(tempPayload)}`)
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
          console.log(`data.status:${data.status}`)
          if (data.status === "success") {
            const tempPayload = JSON.stringify(data.data);
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("userInfo", JSON.stringify(tempPayload));
            console.log('在localStorage存入更新的userInfo');
          } else {
            setPayload(null);
            setIsAuthenticated(false);
            console.log(`失敗，未更新userInfo`);
          }
          return { data };
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
