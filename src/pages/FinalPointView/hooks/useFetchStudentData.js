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
    paginationModel,
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
              page: paginationModel.page + 1,
              take: paginationModel.pageSize,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const data = response.data.data ?? [];
        if (data.length > 0) {
          const formattedData = data.map((item, index) => ({
            ...item,
            id:
              paginationModel.page === 0
                ? index + 1
                : index + 1 + paginationModel.page * paginationModel.pageSize,
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
    paginationModel.page,
    paginationModel.pageSize,
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
