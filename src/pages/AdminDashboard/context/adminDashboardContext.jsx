import { createContext, useState } from "react";

const AdminDashboardContext = createContext({
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

const init = [
  {
    id: 1,
    organizationName: "Tổ chức 1",
    events: "10",
    status: "graded",
  },
  {
    id: 2,
    organizationName: "Tổ chức 2",
    events: "15",
    status: "ungraded",
  },
  {
    id: 3,
    organizationName: "Tổ chức 3",
    events: "8",
    status: "graded",
  },
  {
    id: 4,
    organizationName: "Tổ chức 4",
    events: "12",
    status: "ungraded",
  },
  {
    id: 5,
    organizationName: "Tổ chức 5",
    events: "20",
    status: "graded",
  },
  {
    id: 6,
    organizationName: "Tổ chức 6",
    events: "9",
    status: "ungraded",
  },
  {
    id: 7,
    organizationName: "Tổ chức 7",
    events: "7",
    status: "graded",
  },
  {
    id: 8,
    organizationName: "Tổ chức 8",
    events: "14",
    status: "ungraded",
  },
  {
    id: 9,
    organizationName: "Tổ chức 9",
    events: "11",
    status: "graded",
  },
  {
    id: 10,
    organizationName: "Tổ chức 10",
    events: "16",
    status: "ungraded",
  },
];

// eslint-disable-next-line react/prop-types
const AdminDashboardProvider = ({ children }) => {
  const [rows, setRows] = useState(init);
  const [originalRows, setOriginalRows] = useState(init);
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
    <AdminDashboardContext.Provider value={value}>
      {children}
    </AdminDashboardContext.Provider>
  );
};

export { AdminDashboardContext, AdminDashboardProvider };
