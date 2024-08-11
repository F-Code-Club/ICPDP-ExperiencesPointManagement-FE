import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import useRefreshToken from "../../../hooks/useRefreshToken";
import CircularIndeterminate from "../../CircularIndeterminate";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err.response);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [auth, refresh]);

  return isLoading ? <CircularIndeterminate /> : <Outlet />;
};

export default PersistLogin;
