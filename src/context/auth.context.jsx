import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getRoles } from "../utils/jwt";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [role, setRole] = useState(null);

  useEffect(() => {
    setAuth((prev) => ({ ...prev, refreshToken }));
  }, [refreshToken]);

  useEffect(() => {
    const accessToken = auth?.accessToken;
    if (!accessToken) return;
    setRole(getRoles(accessToken)?.data);
  }, [auth?.accessToken]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, refreshToken, setRefreshToken, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
