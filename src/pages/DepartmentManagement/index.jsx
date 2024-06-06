import React from "react";
import Layout from "../../layouts/Layout";
import DataTable from "../../components/DataTable";

function DepartmentManagement() {
  return (
    <Layout title="Quản lí câu phòng ban">
      <DataTable title={"phòng ban"}/>
    </Layout>
  );
}

export default DepartmentManagement;
