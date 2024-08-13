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

const events = [
    {
      id: 1,
      eventName: "Sự kiện 1",
      status: "approved",
      reason: "lý do 1",
    },
    {
      id: 2,
      eventName: "Sự kiện 2",
      status: "pending",
      reason: "lý do 2",
    },
    {
      id: 3,
      eventName: "Sự kiện 3",
      status: "rejected",
      reason: "lý do 3",
    },
    {
      id: 4,
      eventName: "Sự kiện 4",
      status: "approved",
      reason: "lý do 4",
    },
    {
      id: 5,
      eventName: "Sự kiện 5",
      status: "pending",
      reason: "lý do 5",
    },
    {
      id: 6,
      eventName: "Sự kiện 6",
      status: "rejected",
      reason: "lý do 6",
    },
    {
      id: 7,
      eventName: "Sự kiện 7",
      status: "approved",
      reason: "lý do 7",
    },
    {
      id: 8,
      eventName: "Sự kiện 8",
      status: "pending",
      reason: "lý do 8",
    },
    {
      id: 9,
      eventName: "Sự kiện 9",
      status: "rejected",
      reason: "lý do 9",
    },
    {
      id: 10,
      eventName: "Sự kiện 10",
      status: "approved",
      reason: "lý do 10",
    },
  ];
  

// eslint-disable-next-line react/prop-types
const DashboardProvider = ({ children }) => {
  const [rows, setRows] = useState(events);
  const [originalRows, setOriginalRows] = useState(events);
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
