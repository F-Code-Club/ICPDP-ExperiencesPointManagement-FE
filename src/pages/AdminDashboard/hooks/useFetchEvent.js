import { useState, useContext } from "react";
import axios from "../../../config/axios/index";
import { API_ENDPOINTS } from "../../../utils/api";
import useAuth from "../../../hooks/useAuth";
import { AdminDashboardContext } from "../context/adminDashboardContext";
import useDebounce from "../../../hooks/useDebounce";
import { toastError } from "../../../utils/toast";
const useFetchEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setRows, setOriginalRows } = useContext(AdminDashboardContext);
  const {
    auth: { accessToken },
  } = useAuth();
  const fetchEventData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_ENDPOINTS.EVENT_DASHBOARD.GET_ALL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: 1,
          take: 0,
        },
      });
      const data = response.data.data;
      const formattedData = data.map((event, index) => ({
        id: index + 1,
        status: event.status === true ? "graded" : "ungraded",
        ...event,
      }));

      setRows(formattedData);
      setOriginalRows(formattedData);
    } catch (err) {
      toastError("Get event failed");
    } finally {
      setIsLoading(false);
    }
  };
  const debouncedFetchEventData = useDebounce(fetchEventData, 500);
  return { isLoading, fetchEventData: debouncedFetchEventData };
};

export default useFetchEvent;
