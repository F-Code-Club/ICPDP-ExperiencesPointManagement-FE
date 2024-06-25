import ExperiencePointTable from "./components/ExperiencePointTable";
import { useState, useContext, useEffect } from "react";
import columnsSchema from "./column";
import { ROLE } from "../../constant/core";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { formConfig } from "./pointViewFormConfig";
import { AuthContext } from "../../context/auth.context";
const initRow = [
  {
    studentID: "SE123456",
    name: "Nguyễn Văn A",
    participantRole: "Thành viên",
    bonus: 10,
  },
  {
    studentID: "SE78910j",
    name: "Nguyễn Văn A",
    participantRole: "Thành viên",
    bonus: 10,
  },
];

const ExperiencePointView = () => {
  const axios = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  return (
    <>
      <ExperiencePointTable
        title="sinh viên"
        initialRows={initRow}
        columnsSchema={columnsSchema}
        // API_ENDPOINTS={API_ENDPOINTS.DEPARTMENTS}
        accessToken={accessToken}
        role={ROLE.USER}
        formConfig={formConfig}
      />
    </>
  );
};

export default ExperiencePointView;
