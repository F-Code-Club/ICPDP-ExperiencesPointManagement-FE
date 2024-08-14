import { useContext, useEffect, useState } from "react";

import useAuth from "../../../hooks/useAuth";
import { SemesterContext } from "../semester.context";
import semesterApi from "../../../utils/api/semesterApi";

import { errorToastHandler } from "../../../utils/toast/actions";

const useFetchSemesters = (searchQuery) => {
  const { setRows, setOriginalRows, paginationModel, setTotal } =
    useContext(SemesterContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    auth: { accessToken },
  } = useAuth();

  useEffect(() => {
    const abortController = new AbortController();

    if (!accessToken) return;

    const fetchRemote = async () => {
      try {
        const result = await semesterApi.fetchPagination(
          {
            page: 0,
            pageSize: 0,
          },
          accessToken,
          abortController.signal
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
          errorToastHandler({
            message: "Failed to fetch total semesters. Please try again later.",
          });
        }
      }
    };

    fetchRemote();

    return () => abortController.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) return;
    setIsLoading(true);
    const abortController = new AbortController();

    if (!accessToken) return;

    const fetchRemote = async () => {
      try {
        const result = await semesterApi.fetchPagination(
          {
            page: paginationModel.page,
            pageSize:
              paginationModel.pageSize === -1 ? 0 : paginationModel.pageSize,
          },
          accessToken,
          abortController.signal
        );
        const rowsWithIds =
          result?.data.map((row, index) => ({
            ...row,
            id: paginationModel.page * paginationModel.pageSize + index + 1,
          })) || [];

        setRows(rowsWithIds);
      } catch (error) {
        if (error.name !== "CanceledError") {
          errorToastHandler({
            message: "Failed to fetch semesters. Please try again later.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemote();

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, paginationModel.page, paginationModel.pageSize]);

  return { isLoading };
};

export default useFetchSemesters;
