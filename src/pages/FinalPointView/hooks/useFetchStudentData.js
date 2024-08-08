import { useContext, useState, useCallback, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FinalPointContext } from "../context/FinalPointContext";
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
  } = useContext(FinalPointContext);

  const axios = useAxiosPrivate();
  const {
    auth: { accessToken },
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = useCallback(async () => {
    if (selectedSemester && selectedYear) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.FINAL_POINTS.GET}/${selectedYear}&${selectedSemester}`,
          {
            params: { page: 1, take: 0 },
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const data = response.data.data || [];
        const formattedData = data.map((item, index) => ({
          ...item,
          id: index + 1,
          ...clientDataFormatter(item),
        }));

        setRows(formattedData);
        setOriginalRows(formattedData);
      } catch (error) {
        toastError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
        setRows([]);
        setOriginalRows([]);
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
  useEffect(() => {
    setRows([]);
    setOriginalRows([]);
  }, [selectedSemester, selectedYear]);

  const debouncedFetchData = useDebounce(fetchData, 300);
  return { rows, originalRows, debouncedFetchData, isLoading, setIsLoading };
};

export default useFetchStudentData;
