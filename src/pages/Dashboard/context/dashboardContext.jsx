import { createContext, useState } from "react";

const DashboardContext = createContext({
  rows: [],
  rowSelectionModel: [],
  originalRows: [],
  setRows: () => {},
  setOriginalRows: () => {},
  setPaginationModel: () => {},
  setRowSelectionModel: () => {},
  selectedRows: () => {},
  setSelectedRows: () => {},
});


// eslint-disable-next-line react/prop-types
const DashboardProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const value = {
    rows,
    originalRows,
    setRows,
    setOriginalRows,
    rowSelectionModel,
    setRowSelectionModel,
    selectedRows,
    setSelectedRows,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };
