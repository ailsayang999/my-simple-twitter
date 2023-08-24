import { createContext } from "react";

const AuthContext = createContext("");

function AuthContextProvider({ children }) {


  const AuthContextValueToShare = {

  };

  return (
    <AuthContext.Provider value={AuthContextValueToShare}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
