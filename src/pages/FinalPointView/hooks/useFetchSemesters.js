import { useState, useEffect, useMemo } from "react";
import useAuth from "../../../hooks/useAuth";
import { API_ENDPOINTS } from "../../../utils/api";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
const useFetchSemesters = () => {
  const [semesters, setSemesters] = useState([]);
  const axios = useAxiosPrivate();
  const {
    auth: { accessToken },
  } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.SEMESTERS.GET_ALL, {
          params: {
            page: 1,
            take: 0,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data.data;
        setSemesters(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [accessToken]);
  const years = useMemo(() => {
    return Array.from(
      new Set(
        semesters
          .map((semester) => {
            const year = parseInt(semester?.year, 10);
            return !isNaN(year) ? year : null;
          })
          .filter((year) => year !== null)
      )
    );
  }, [semesters]);
  return { semesters, years };
};

export default useFetchSemesters;
