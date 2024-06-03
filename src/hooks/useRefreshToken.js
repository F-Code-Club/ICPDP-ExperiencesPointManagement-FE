import useAuth from "./useAuth";
import { API_ENDPOINTS } from "../utils/api";
import { post } from "../utils/apiCaller";
import { errorToastHandler } from "../utils/toast/actions";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    if (!auth?.accessToken)
      return errorToastHandler({ message: "No access token found" });
    if (!auth?.refreshToken)
      return errorToastHandler({ message: "No refresh token found" });
    try {
      const response = await post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, false, {
        refreshToken: auth.refreshToken,
      });
      const { data } = response;
      const result = data.data;
      if (!result) {
        return errorToastHandler(data);
      }
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        };
      });
      return response.data.accessToken;
    } catch (error) {
      errorToastHandler(error.response);
    }
  };
  return refresh;
};

export default useRefreshToken;
