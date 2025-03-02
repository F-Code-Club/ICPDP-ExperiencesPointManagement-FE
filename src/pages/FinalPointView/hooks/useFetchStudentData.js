import { useContext, useState, useCallback } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FinalPointContext } from "../context/finalPointContext";
import { API_ENDPOINTS } from "../../../utils/api";
import useAuth from "../../../hooks/useAuth";
import useDebounce from "../../../hooks/useDebounce";
import { toastError } from "../../../utils/toast";
import { clientDataFormatter } from "../dataFormatter";

const useFetchStudentData = () => {
  const {
    setRows,
    setOriginalRows,
    rows,
    originalRows,
    selectedSemester,
    selectedYear,
    setTotal,
  } = useContext(FinalPointContext);

  const {
    auth: { accessToken },
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxiosPrivate();
  const fetchData = useCallback(async () => {
    if (selectedSemester && selectedYear) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.FINAL_POINTS.GET}/${selectedYear}&${selectedSemester}`,
          {
            params: {
              page: 1,
              take: 0,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const data = response.data.data ?? [];
        if (data.length > 0) {
          const formattedData = data.map((item, index) => ({
            ...item,
            id: index + 1,
            ...clientDataFormatter(item),
          }));
          setRows(formattedData);
          setOriginalRows(formattedData);
          setTotal(response.data.totalPage);
        } else {
          toastError("Table is empty.");
        }
      } catch (error) {
        // EMPTY
      } finally {
        setIsLoading(false);
      }
    }
  }, [
    axios,
    selectedSemester,
    selectedYear,
    accessToken,
    setRows,
    setOriginalRows,
  ]);
  const debouncedFetchData = useDebounce(fetchData, 300);

  return {
    rows,
    originalRows,
    isLoading,
    setIsLoading,
    debouncedFetchData,
    fetchData,
  };
};

export default useFetchStudentData;
