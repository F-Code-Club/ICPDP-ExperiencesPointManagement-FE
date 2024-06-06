import React from "react";
import Layout from "../../layouts/Layout";
import DataTable from "../../components/DataTable";

function ClubManagement() {
  return (
    <Layout title="Quản lí câu lạc bộ">
      <DataTable title={"câu lạc bộ"}/>
    </Layout>
  );
}

export default ClubManagement;
