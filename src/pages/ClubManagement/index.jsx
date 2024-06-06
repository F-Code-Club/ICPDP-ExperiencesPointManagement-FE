import React from "react";
import Layout from "../../layouts/Layout";
import DataTable from "../../components/DataTable";
import columnsSchema from "./columns";

const initialRows = [
  { id: 1, name: "test1", email: `test1@gmail.com` },
  { id: 2, name: "test2", email: `test2@gmail.com` },
  { id: 3, name: "test3", email: `test3@gmail.com` },
  { id: 4, name: "test1", email: `test1@gmail.com` },
  { id: 5, name: "test2", email: `test2@gmail.com` },
  { id: 6, name: "test3", email: `test3@gmail.com` },
  { id: 7, name: "test1", email: `test1@gmail.com` },
  { id: 8, name: "test2", email: `test2@gmail.com` },
  { id: 9, name: "test3", email: `test3@gmail.com` },
  {
    id: 10,
    name: "Fcode",
    email: `test1@gmail.com`,
    password: "dasdas",
    username: "dsad",
    avatar:
      "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/440491684_953819473416997_5707415369883086073_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=0Js6PhRnegIQ7kNvgE5CJB-&_nc_ht=scontent.fsgn5-5.fna&oh=00_AYDIDKxX74BqJS65cNj99QmVjFS7UD4bJQYqnVEEHDiyuw&oe=66674F05",
  },
];

function ClubManagement() {
 
  return (
    <Layout title="Quản lí câu lạc bộ">
      <DataTable
        title={"câu lạc bộ"}
        initialRows={initialRows}
        columnsSchema={columnsSchema}
      />
    </Layout>
  );
}

export default ClubManagement;
