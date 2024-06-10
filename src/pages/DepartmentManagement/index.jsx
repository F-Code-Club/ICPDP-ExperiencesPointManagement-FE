import React, { useState, useEffect, useCallback, useContext } from "react";
import DataTable from "../../components/DataTable";
import columnsSchema from "./columns";
import { API_ENDPOINTS } from "../../utils/api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AuthContext } from "../../context/auth.context";
import Header from "../../components/Header";
const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const axios = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.DEPARTMENT.GET_ALL, {
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
      console.error("Error fetching data:", error.response);
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
        API_ENDPOINTS={API_ENDPOINTS.DEPARTMENT}
        accessToken={accessToken}
        role="dept"
      />
    </>
  );
};

export default DepartmentManagement;
