import { useCallback, useContext, useEffect, useState } from "react";

import useAuth from "../../../hooks/useAuth";
import { StudentContext } from "../student.context";

import { toastError } from "../../../utils/toast";
import useDebounce from "../../../hooks/useDebounce";

const useFetchStudents = (searchQuery) => {
  const { setRows, setOriginalRows, paginationModel, setTotal, api } =
    useContext(StudentContext);
  const [isTotalLoading, setIsTotalLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    auth: { accessToken },
  } = useAuth();

  const fetchTotal = useCallback(async (signal) => {
    try {
      setIsTotalLoading(true);
      if (!accessToken) return setIsTotalLoading(false);
      const result = await api.fetchPagination(
        {
          page: 0,
          pageSize: 0,
        },
        accessToken,
        signal
      );

      const data = result.data ?? [];

      if (data.length > 0) {
        const formattedData =
          data.map((item, index) => ({
            ...item,
            id: index + 1,
          })) || [];

        setOriginalRows(formattedData);
        setTotal(data.length);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        toastError("Failed to fetch total students. Please try again later.");
      }
    } finally {
      setIsTotalLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedFetchTotalData = useDebounce(fetchTotal, 300);

  const fetchData = useCallback(
    async (signal) => {
      if (searchQuery.trim().length > 0) return;
      setIsLoading(true);
      if (!accessToken) return setIsLoading(false);
      try {
        const result = await api.fetchPagination(
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
            id: paginationModel.page * paginationModel.pageSize + index + 1,
          })) || [];

        setRows(rowsWithIds);
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
    const abortController = new AbortController();

    debouncedFetchTotalData(abortController.signal);

    return () => abortController.abort();
  }, [debouncedFetchTotalData]);

  useEffect(() => {
    const abortController = new AbortController();

    fetchData(abortController.signal);

    return () => abortController.abort();
  }, [fetchData]);

  return { isLoading, isTotalLoading };
};

export default useFetchStudents;
