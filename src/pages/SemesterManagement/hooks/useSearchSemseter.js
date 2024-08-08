import { useCallback, useContext, useEffect, useState } from "react";
import { SemesterContext } from "../semester.context";
import useDebounce from "../../../hooks/useDebounce";

const useSearchSemester = () => {
  const { originalRows, setRows } = useContext(SemesterContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  }, []);

  const debouncedSearchQuery = useDebounce(handleSearch, 300);

  useEffect(() => {
    const filteredRows = originalRows.filter(
      (row) =>
        row.year.toString().toLowerCase().includes(searchQuery) ||
        row.semester.toLowerCase().includes(searchQuery)
    );
    setRows(filteredRows);
  }, [searchQuery, originalRows, setRows]);

  return debouncedSearchQuery;
};

export default useSearchSemester;
