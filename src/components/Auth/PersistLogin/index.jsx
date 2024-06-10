import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import useRefreshToken from "../../../hooks/useRefreshToken";
import CircularIndeterminate from "../../CircularIndeterminate";
import { errorToastHandler } from "../../../utils/toast/actions";
import Layout from "../../../layouts/Layout";

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
        errorToastHandler(err.response);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [auth, refresh]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth)}`);
  }, [isLoading, auth]);

  return isLoading ? <CircularIndeterminate /> : <Outlet />;
};

export default PersistLogin;
