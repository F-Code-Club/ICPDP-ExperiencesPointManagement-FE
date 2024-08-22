import { useCallback, useContext, useEffect, useState } from "react";
import { DashboardContext } from "../context/dashboardContext";
import useDebounce from "../../../hooks/useDebounce";
import { searchString } from "../../../utils/stringHelper";
const useSearchStudent = () => {
  const { originalRows, setRows } = useContext(DashboardContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  }, []);

  const debouncedSearchQuery = useDebounce(handleSearch, 300);
  useEffect(() => {
    const filteredRows = originalRows.filter((row) =>
      searchString(row.eventName, searchQuery)
    );
    setRows(filteredRows);
  }, [searchQuery, originalRows, setRows]);
  return debouncedSearchQuery;
};

export default useSearchStudent;
