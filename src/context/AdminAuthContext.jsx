import { createContext, useState, useEffect, useContext } from 'react';
import { adminLogin } from '../api/admin';
// import { checkPermission } from '../api/admin'; 有要驗證token嗎?

import jwt_decode from "jwt-decode"
import { useLocation } from 'react-router-dom';

const defaultAuthAdminContext = {
  isAuthenticated: false, // 使用者是否登入的判斷依據，預設為 false，若取得後端的有效憑證，則切換為 true
  currentMember: null, // 當前使用者相關資料，預設為 null，成功登入後就會有使用者資料
  adminLogin: null,
  adminLogout: null,
};

const AuthAdminContext = createContext(defaultAuthAdminContext);
export const useAdminAuth = () => useContext(AuthAdminContext);

export const AuthAdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      // 有要驗證token嗎?
      // const result = await checkPermission(authToken);
      // if (result) {
      //   setIsAuthenticated(true);
      //   const tempPayload = jwt.decode(authToken);
      //   setPayload(tempPayload);
      // } else {
      //   setIsAuthenticated(false);
      //   setPayload(null);
      // }
    };

    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthAdminContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub, // 取出 sub 字串，可以做為使用者 id
          name: payload.name, // 取出使用者帳號
        },
        adminLogin: async (data) => {
          console.log(`進入authAdminContext.jsx中await adminLogin!`)
          const { success, authToken } = await adminLogin({
            account: data.account,
            password: data.password,
          });
          const tempPayload = jwt_decode.decode(authToken);
          if (tempPayload) {
            console.log(`tempPayload:${JSON.stringify(tempPayload)}`)
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return {success};
        },
        adminLogout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthAdminContext.Provider>
  );
};
