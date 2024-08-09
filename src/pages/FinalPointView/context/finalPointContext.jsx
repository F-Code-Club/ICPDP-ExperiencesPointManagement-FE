import { createContext, useState } from "react";
import { PAGE_SIZE } from "../../../constant/core";

const FinalPointContext = createContext({
  rows: [],
  rowSelectionModel: [],
  originalRows: [],
  paginationModel: {
    pageSize: PAGE_SIZE,
    page: 0,
  },
  setRows: () => {},
  setOriginalRows: () => {},
  setPaginationModel: () => {},
  total: 0,
  setTotal: () => {},
  setRowSelectionModel: () => {},
  selectedYear: null,
  selectedSemester: null,
  setSelectedYear: () => {},
  setSelectedSemester: () => {},
});

// eslint-disable-next-line react/prop-types
const FinalPointProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  const value = {
    rows,
    originalRows,
    setRows,
    setOriginalRows,
    total,
    setTotal,
    rowSelectionModel,
    setRowSelectionModel,
    selectedSemester,
    selectedYear,
    setSelectedSemester,
    setSelectedYear,
    paginationModel,
    setPaginationModel,
  };

  return (
    <FinalPointContext.Provider value={value}>
      {children}
    </FinalPointContext.Provider>
  );
};

export { FinalPointContext, FinalPointProvider };
