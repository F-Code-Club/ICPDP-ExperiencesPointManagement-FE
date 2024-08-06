import { useCallback, useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";

const useSearch = (originalRows, setRows, filter) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  }, []);

  const debouncedSearchQuery = useDebounce(handleSearch, 300);

  useEffect(() => {
    const filteredRows = originalRows.filter((row) => filter(row, searchQuery));
    setRows(filteredRows);
  }, [searchQuery, originalRows, setRows, filter]);

  return debouncedSearchQuery;
};

export default useSearch;
