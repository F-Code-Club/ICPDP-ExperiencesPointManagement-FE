import useAuth from "./useAuth";
import axios from "../config/axios";
import { API_ENDPOINTS } from "../utils/api";
import { errorToastHandler } from "../utils/toast/actions";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth(null);
    // TODO: Integrate API
    try {
      await axios(API_ENDPOINTS.AUTH.LOGOUT, {
        withCredentials: true,
      });
    } catch (err) {
      errorToastHandler(err.response);
    }
  };

  return logout;
};

export default useLogout;
