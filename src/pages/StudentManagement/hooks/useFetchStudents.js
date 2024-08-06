import { useCallback, useContext, useEffect, useState } from "react";

import useAuth from "../../../hooks/useAuth";
import { StudentContext } from "../student.context";

import studentApi from "../../../utils/api/studentApi";
import { toastError } from "../../../utils/toast";

const useFetchStudents = () => {
  const { setRows, setOriginalRows, paginationModel, setTotal } =
    useContext(StudentContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    auth: { accessToken },
  } = useAuth();

  useEffect(() => {
    const abortController = new AbortController();

    if (!accessToken) return;

    const fetchRemote = async () => {
      try {
        const result = await studentApi.fetchPagination(
          {
            page: 0,
            pageSize: 0,
          },
          accessToken,
          abortController.signal
        );

        result.data.length > 0 && setTotal(result.data.length);
      } catch (error) {
        if (error.name !== "CanceledError") {
          toastError("Failed to fetch total students. Please try again later.");
        }
      }
    };

    fetchRemote();

    return () => abortController.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const fetchData = useCallback(
    async (signal) => {
      try {
        const result = await studentApi.fetchPagination(
          {
            page: paginationModel.page,
            pageSize:
              paginationModel.pageSize === -1 ? 0 : paginationModel.pageSize,
          },
          accessToken,
          signal
        );
        const rowsWithIds =
          result?.data.map((row, index) => ({
            ...row,
            id: index + 1,
          })) || [];

        setRows(rowsWithIds);
        setOriginalRows(rowsWithIds);
      } catch (error) {
        if (error.name !== "CanceledError") {
          toastError("Error fetching data. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken, paginationModel.page, paginationModel.pageSize]
  );

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();

    if (!accessToken) return;
    fetchData(abortController.signal);

    return () => abortController.abort();
  }, [fetchData, accessToken]);

  return { isLoading };
};

export default useFetchStudents;
