import { useCallback, useContext, useEffect, useState } from "react";
import { DashboardContext } from "../context/dashboardContext";
import useDebounce from "../../../hooks/useDebounce";

const useSearchStudent = () => {
  const { originalRows, setRows } = useContext(DashboardContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  }, []);

  const debouncedSearchQuery = useDebounce(handleSearch, 300);
  useEffect(() => {
    const filteredRows = originalRows.filter((row) =>
      row.eventName.toString().toLowerCase().includes(searchQuery)
    );
    setRows(filteredRows);
  }, [searchQuery, originalRows, setRows]);
  return debouncedSearchQuery;
};

export default useSearchStudent;
