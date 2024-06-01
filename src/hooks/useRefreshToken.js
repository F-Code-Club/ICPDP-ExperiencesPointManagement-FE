import useAuth from "./useAuth";
import { API_ENDPOINTS } from "../utils/api";
import { post } from "../utils/apiCaller";
import { toastError } from "../utils/toast";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, false, {
        refreshToken: auth.refreshToken,
      });
      const { data } = response;
      const result = data.data;
      if (!result) {
        return toastError(data.message);
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
      toastError(error.message);
    }
  };
  return refresh;
};

export default useRefreshToken;
