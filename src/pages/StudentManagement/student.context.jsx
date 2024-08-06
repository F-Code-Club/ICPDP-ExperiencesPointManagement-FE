import { createContext, useState } from "react";
import { PAGE_SIZE } from "../../constant/core";

const StudentContext = createContext({
  rows: [],
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
  role: "",
  rowSelectionModel: [],
  setRowSelectionModel: () => {},
});

// eslint-disable-next-line react/prop-types
const StudentProvider = ({ children }) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  const [total, setTotal] = useState(0);

  const value = {
    rows,
    originalRows,
    setRows,
    setOriginalRows,
    paginationModel,
    setPaginationModel,
    total,
    setTotal,
    rowSelectionModel,
    setRowSelectionModel,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
