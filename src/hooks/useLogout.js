import useAuth from "./useAuth";
import { API_ENDPOINTS } from "../utils/api";
import { errorToastHandler } from "../utils/toast/actions";
import { get } from "../utils/apiCaller";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth(null);
    // TODO: Integrate API
    try {
      await get(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (err) {
      errorToastHandler(err.response);
    }
  };

  return logout;
};

export default useLogout;
