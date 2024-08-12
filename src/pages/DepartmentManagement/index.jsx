import { useState, useEffect, useCallback, useContext } from "react";
import DataTable from "../../components/DataTable";
import columnsSchema from "./columns";
import { API_ENDPOINTS } from "../../utils/api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AuthContext } from "../../context/auth.context";
import { exportOptions } from "./exportOptions";
import { toastError } from "../../utils/toast";
import { ROLE } from "../../constant/core";
import { formConfig } from "./formConfig";
const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const axios = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.DEPARTMENTS.GET_ALL, {
        params: {
          page: currentPage,
          take: 0,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        setDepartments(response.data.data);
      }
    } catch (error) {
      toastError("Error fetching data");
    }
  }, [axios, currentPage, departments?.length]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <DataTable
        title="phòng ban"
        initialRows={departments}
        columnsSchema={columnsSchema}
        onPageChange={handlePageChange}
        API_ENDPOINTS={API_ENDPOINTS.DEPARTMENTS}
        accessToken={accessToken}
        exportOptions={exportOptions}
        role={ROLE.DEPARTMENT}
        formConfig={formConfig}
      />
    </>
  );
};

export default DepartmentManagement;
