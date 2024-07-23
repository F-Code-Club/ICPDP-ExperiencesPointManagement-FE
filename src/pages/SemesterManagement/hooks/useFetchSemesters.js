import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import semesterApi from "../../../utils/api/semesterApi";
import { errorToastHandler } from "../../../utils/toast/actions";
import useAuth from "../../../hooks/useAuth";
import { SemesterContext } from "../semester.context";

const useFetchSemesters = () => {
  const { setRows, setOriginalRows, paginationModel } =
    useContext(SemesterContext);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxiosPrivate();
  const {
    auth: { accessToken },
  } = useAuth();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchRemote = async () => {
      try {
        const result = await semesterApi.fetchPagination(
          {
            page: 1,
            pageSize: 0,
          },
          axios,
          accessToken,
          abortController.signal
        );

        result.data.length > 0 && setTotal(result.data.length);
      } catch (error) {
        console.error(error);
        errorToastHandler({
          message: "Failed to fetch total semesters. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemote();

    return () => abortController.abort();
  }, [accessToken, axios]);

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();

    const fetchRemote = async () => {
      try {
        const result = await semesterApi.fetchPagination(
          paginationModel,
          axios,
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
        console.error(error);
        errorToastHandler({
          message: "Failed to fetch semesters. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemote();

    return () => abortController.abort();
  }, [accessToken, axios, paginationModel, setRows, setOriginalRows]);

  return { total, isLoading };
};

export default useFetchSemesters;
