import React, { useState, useEffect, useCallback, useContext } from "react";
import StudentDataTable from "./components/StudentDataTable";

import columnsSchema from "./columns";
import { API_ENDPOINTS } from "../../utils/api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AuthContext } from "../../context/auth.context";
import { exportOptions } from "./exportOptions";
import { toastError } from "../../utils/toast";
import { ROLE } from "../../constant/core";
import { formConfig } from "./formConfig";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const axios = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.STUDENTS.GET_ALL, {
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
        setStudents(response.data.data);
      } else {
        console.error("Unexpected status:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toastError(`Error fetching data: ${error.message}`);
    }
  }, [axios, currentPage, students?.length]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <StudentDataTable
        title="sinh viên"
        initialRows={students}
        columnsSchema={columnsSchema}
        onPageChange={handlePageChange}
        API_ENDPOINTS={API_ENDPOINTS.STUDENTS}
        accessToken={accessToken}
        exportOptions={exportOptions}
        role={ROLE.STUDENT}
        formConfig={formConfig}
      />
    </>
  );
};

export default StudentManagement;
