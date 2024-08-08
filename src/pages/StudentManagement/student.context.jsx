import { createContext, useMemo, useState } from "react";

import useAuth from "../../hooks/useAuth";

import { PAGE_SIZE, ROLE } from "../../constant/core";
import studentApi from "../../utils/api/studentApi";
import clubMemberApi from "../../utils/api/clubMemberApi";
import departmentMemberApi from "../../utils/api/departmentMemberApi";

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
  api: {},
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

  const { role } = useAuth();
  const api = useMemo(
    () =>
      role === ROLE.ADMIN
        ? studentApi
        : role === ROLE.CLUB
          ? clubMemberApi
          : departmentMemberApi,
    [role]
  );

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
    api,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
