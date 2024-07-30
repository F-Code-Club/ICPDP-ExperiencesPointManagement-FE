import { createContext, useState } from "react";
import { PAGE_SIZE } from "../../constant/core";

const SemesterContext = createContext({
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
});

// eslint-disable-next-line react/prop-types
const SemesterProvider = ({ children }) => {
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
  };

  return (
    <SemesterContext.Provider value={value}>
      {children}
    </SemesterContext.Provider>
  );
};

export { SemesterContext, SemesterProvider };
