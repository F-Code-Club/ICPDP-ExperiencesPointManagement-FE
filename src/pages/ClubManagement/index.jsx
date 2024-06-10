import React, { useState, useEffect, useCallback, useContext } from "react";
import DataTable from "../../components/DataTable";
import columnsSchema from "./columns";
import { API_ENDPOINTS } from "../../utils/api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AuthContext } from "../../context/auth.context";
import Layout from "../../layouts/Layout";
const ClubManagement = () => {
  const [clubs, setClubs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const axios = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.CLUBS.GET_ALL, {
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
        setClubs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response);
    }
  }, [axios, currentPage, clubs?.length]);

  useEffect(() => {
    fetchData();
    console.log("Re-render");
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <DataTable
        title="câu lạc bộ"
        initialRows={clubs}
        columnsSchema={columnsSchema}
        onPageChange={handlePageChange}
        API_ENDPOINTS={API_ENDPOINTS.CLUBS}
        accessToken={accessToken}
        role="club"
      />
    </>
  );
};

export default ClubManagement;
