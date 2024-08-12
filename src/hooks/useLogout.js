import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_ENDPOINTS } from "../utils/api";
import { errorToastHandler } from "../utils/toast/actions";
import { toastSuccess } from "../utils/toast";

const useLogout = () => {
  const { setAuth, setRefreshToken } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setRefreshToken(null);
    setAuth(null);
    try {
      await axiosPrivate(API_ENDPOINTS.AUTH.LOGOUT);
      toastSuccess("Logout successful");
    } catch (err) {
      errorToastHandler(err.response);
    }
  };

  return logout;
};

export default useLogout;
