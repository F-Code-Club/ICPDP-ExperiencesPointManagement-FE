import ExperiencePointTable from "./components/ExperiencePointTable";
import { useState, useContext, useEffect } from "react";
import { decodeToken } from "react-jwt";
import columnsSchema from "./column";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { formConfig } from "../../pages/ExperiencePointView/pointViewFormConfig";
import { AuthContext } from "../../context/auth.context";
import { API_ENDPOINTS } from "../../utils/api";
const initRow = [
  // {
  //   studentID: "SE123456",
  //   name: "Nguyễn Văn A",
  //   participantRole: "Thành viên",
  //   bonus: 10,
  // },
  // {
  //   studentID: "SE78910j",
  //   name: "Nguyễn Văn A",
  //   participantRole: "Thành viên",
  //   bonus: 10,
  // },
];

const ExperiencePointView = () => {
  const axios = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const decoded = auth?.accessToken ? decodeToken(auth.accessToken) : undefined;
  const role = decoded?.role || "";

  return (
    <>
      <ExperiencePointTable
        title="sinh viên"
        initialRows={initRow}
        columnsSchema={columnsSchema}
        API_ENDPOINTS={API_ENDPOINTS}
        accessToken={accessToken}
        role={role}
        formConfig={formConfig}
      />
    </>
  );
};

export default ExperiencePointView;
