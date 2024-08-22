import axios from "../../../config/axios";
import useAuth from "../../../hooks/useAuth";
import { API_ENDPOINTS } from "../../../utils/api";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";

const useFetchStudent = (
  eventID,
  setOriginalRows,
  setRows,
  setTables,
  setTotalPage,
  tables
) => {
  const [pageLoading, setPageLoading] = useState(false);
  const {
    auth: { accessToken },
  } = useAuth();

  const fetchData = async () => {
    setPageLoading(true);
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.EVENTS_POINT.GET}/${eventID}`,
        {
          params: {
            page: 1,
            take: 0,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data.data || [];
      const totalPage = response.data.totalPage || 0;
      const rowsWithIds = data.map((row, index) => ({
        ...row,
        name: row?.studentName,
        id: index + 1,
      }));
      setOriginalRows(rowsWithIds);
      setRows(rowsWithIds);
      const updatedTables = tables.map((table) =>
        table.eventID === eventID ? { ...table, rows: rowsWithIds } : table
      );
      setTables(updatedTables);
      setTotalPage(totalPage);
    } catch (error) {
      // Handle error
    } finally {
      setPageLoading(false);
    }
  };
  const debouncedFetchRows = useDebounce(fetchData, 500);
  return { fetchData, pageLoading, debouncedFetchRows };
};
export default useFetchStudent;
