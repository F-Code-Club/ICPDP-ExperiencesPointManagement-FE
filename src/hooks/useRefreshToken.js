import { useCallback } from "react";
import useAuth from "./useAuth";
import { API_ENDPOINTS } from "../utils/api";
import { post } from "../utils/apiCaller";
import { errorToastHandler } from "../utils/toast/actions";

const useRefreshToken = () => {
  const { setAuth, refreshToken, setRefreshToken } = useAuth();

  const refresh = useCallback(async () => {
    try {
      const response = await post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
        refreshToken: refreshToken,
      });
      const { data } = response;
      const result = data.data;
      if (!result) {
        return errorToastHandler(data);
      }
      setAuth((prev) => ({
        ...prev,
        accessToken: result.accessToken,
      }));
      setRefreshToken(result.refreshToken);
    } catch (error) {
      errorToastHandler(error.response);
      setRefreshToken("");
    }
  }, [refreshToken, setAuth, setRefreshToken]);

  return refresh;
};

export default useRefreshToken;
