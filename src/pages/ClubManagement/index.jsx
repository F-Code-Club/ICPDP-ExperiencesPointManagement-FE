import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../layouts/Layout";
import DataTable from "../../components/DataTable";
import columnsSchema from "./columns";
import { API_ENDPOINTS } from "../../utils/api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ClubManagement = () => {
  const [clubs, setClubs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const axios = useAxiosPrivate();

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJkZWExM2E0Ni1mMzJmLTQ4YWUtODgwOS1iOTE0MWRjMDk5ZDAiLCJ1c2VybmFtZSI6InRlc3QxMjMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTgwMDAwOTUsImV4cCI6MTcxODAwMTg5NX0.sr4Z1pelwtykKCX2JC_UnzRvKvYBWDxPhEAaz9IlACU";

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
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Layout title="Quản lí câu lạc bộ">
      <DataTable
        title="câu lạc bộ"
        initialRows={clubs}
        columnsSchema={columnsSchema}
        onPageChange={handlePageChange}
        API_ENDPOINTS={API_ENDPOINTS.CLUBS}
        accessToken={accessToken}
        role="club"
      />
    </Layout>
  );
};

export default ClubManagement;
