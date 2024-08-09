import { useCallback, useContext, useState } from "react";
import { FinalPointContext } from "../context/finalPointContext";
import { API_ENDPOINTS } from "../../../utils/api";
import { clientDataFormatter } from "../dataFormatter";
import { toastError, toastSuccess } from "../../../utils/toast";
import useAuth from "../../../hooks/useAuth";
import useDebounce from "../../../hooks/useDebounce";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
const useCalculateData = () => {
  const { setRows, setOriginalRows, selectedSemester, selectedYear } =
    useContext(FinalPointContext);
  const axios = useAxiosPrivate();
  const {
    auth: { accessToken },
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const calculateData = useCallback(async () => {
    if (selectedSemester && selectedYear) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${API_ENDPOINTS.FINAL_POINTS.ADD}/${selectedYear}&${selectedSemester}`,
          {
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
        toastSuccess("Calculate successfully.");
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

  const debouncedCalculateData = useDebounce(calculateData, 500);
  return { debouncedCalculateData, isLoading, setIsLoading };
};

export default useCalculateData;
