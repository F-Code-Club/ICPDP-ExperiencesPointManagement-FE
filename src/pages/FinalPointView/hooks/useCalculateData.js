import { useCallback, useContext } from "react";
import { FinalPointContext } from "../context/finalPointContext";
import { API_ENDPOINTS } from "../../../utils/api";
import { toastError, toastSuccess } from "../../../utils/toast";
import useAuth from "../../../hooks/useAuth";
import useDebounce from "../../../hooks/useDebounce";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useFetchStudentData from "./useFetchStudentData";
const useCalculateData = () => {
  const { setRows, setOriginalRows, selectedSemester, selectedYear } =
    useContext(FinalPointContext);
  const axios = useAxiosPrivate();
  const {
    auth: { accessToken },
  } = useAuth();

  const { isLoading, setIsLoading, fetchData } = useFetchStudentData();
  const calculateData = useCallback(async () => {
    if (selectedSemester && selectedYear) {
      setIsLoading(true);
      try {
        await axios.post(
          `${API_ENDPOINTS.FINAL_POINTS.ADD}/${selectedYear}&${selectedSemester}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        fetchData();
        toastSuccess("Calculate successfully.");
      } catch (error) {
        toastError("Calculate fail.");
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
