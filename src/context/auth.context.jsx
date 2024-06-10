import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");

  useEffect(() => {
    setAuth((prev) => ({ ...prev, refreshToken }));
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, refreshToken, setRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
