import { useCallback, useContext, useEffect, useState } from "react";
import { FinalPointContext } from "../context/finalPointContext";
import useDebounce from "../../../hooks/useDebounce";

const useSearchStudent = () => {
  const { originalRows, setRows } = useContext(FinalPointContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  }, []);
  
  const debouncedSearchQuery = useDebounce(handleSearch, 300);
  useEffect(() => {
    const filteredRows = originalRows.filter(
      (row) =>
        row.studentName.toString().toLowerCase().includes(searchQuery) ||
        row.studentID.toLowerCase().includes(searchQuery)
    );
    setRows(filteredRows);
  }, [searchQuery, originalRows, setRows]);
  return debouncedSearchQuery;
};

export default useSearchStudent;
