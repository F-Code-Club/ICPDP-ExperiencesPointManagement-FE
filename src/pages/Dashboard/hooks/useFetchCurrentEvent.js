import { useState, useContext } from "react";
import axios from "../../../config/axios/index";
import { API_ENDPOINTS } from "../../../utils/api";
import useAuth from "../../../hooks/useAuth";
import { DashboardContext } from "../context/dashboardContext";
import useDebounce from "../../../hooks/useDebounce";
import { toastError } from "../../../utils/toast";
const useFetchCurrentEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setRows, setOriginalRows } = useContext(DashboardContext);

  const {
    auth: { accessToken },
  } = useAuth();

  const fetchCurrentEvent = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_ENDPOINTS.EVENTS.CURRENT, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data.data;
      const formattedData = data.map((event, index) => ({
        id: index + 1,
        status: event.adminPermission.status,
        note: event.adminPermission.note,

        ...event,
      }));
      setRows(formattedData);
      setOriginalRows(formattedData);
    } catch (err) {
      toastError("Get current event failed");
    } finally {
      setIsLoading(false);
    }
  };
  const debouncedFetchEvent = useDebounce(fetchCurrentEvent, 500);
  return { isLoading, fetchCurrentEvent: debouncedFetchEvent };
};

export default useFetchCurrentEvent;
