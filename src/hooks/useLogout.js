import useAuth from "./useAuth";
import axios from "../config/axios";
import { toastError } from "../utils/toast";
import { API_ENDPOINTS } from "../utils/api";

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
      toastError(err.message);
    }
  };

  return logout;
};

export default useLogout;
