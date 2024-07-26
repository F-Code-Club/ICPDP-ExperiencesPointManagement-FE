import { useContext, useEffect, useState } from "react";

import useAuth from "../../../hooks/useAuth";
import { SemesterContext } from "../semester.context";
import semesterApi from "../../../utils/api/semesterApi";

import { errorToastHandler } from "../../../utils/toast/actions";

const useFetchSemesters = () => {
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

        result.data.length > 0 && setTotal(result.data.length);
      } catch (error) {
        console.error(error);
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
            id: index + 1,
          })) || [];

        setRows(rowsWithIds);
        setOriginalRows(rowsWithIds);
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
