import { createContext, useState, useEffect, useContext } from 'react';
import { adminLogin } from '../api/admin';
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
      } else {
      setIsAuthenticated(true);
      }
    };

    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthAdminContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentMember: payload && {
          id: payload.sub, // 取出 sub 字串，可以做為使用者 id
          name: payload.name, // 取出使用者帳號
        },
        adminLogin: async (inputData) => {
          try {
            const { data } = await adminLogin({
              account: inputData.account,
              password: inputData.password,
            });
            if (data.status === "success") {
              const authToken = data.data.token
              setIsAuthenticated(true);
              localStorage.setItem('authToken', authToken);
            } else {
              setPayload(null);
              setIsAuthenticated(false);
            }
            return {data};
          }
          catch(data){
            return Promise.reject(data)
          }
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

 