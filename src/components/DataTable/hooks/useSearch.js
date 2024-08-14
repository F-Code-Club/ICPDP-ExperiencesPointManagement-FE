import { useCallback, useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { STRING_EMPTY } from "../../../constant/core";

const useSearch = (
  originalRows,
  setRows,
  setTotal,
  paginationModel,
  filter
) => {
  const [searchQuery, setSearchQuery] = useState(STRING_EMPTY);
  const [filteredRows, setFilteredRows] = useState([]);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  }, []);

  const debouncedSearchQuery = useDebounce(handleSearch, 500);

  useEffect(() => {
    const filteredRows = originalRows.filter((row) => filter(row, searchQuery));
    setTotal(filteredRows.length);
    setFilteredRows(filteredRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery.trim()]);

  useEffect(() => {
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    setRows(filteredRows.slice(start, end));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredRows, paginationModel.page, paginationModel.pageSize]);

  return { handleSearch: debouncedSearchQuery, searchQuery };
};

export default useSearch;
