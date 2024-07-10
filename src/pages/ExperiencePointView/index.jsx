import ExperiencePointTable from "./components/ExperiencePointTable";
import { useState, useContext, useEffect } from "react";
import { decodeToken } from "react-jwt";
import columnsSchema from "./column";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { formConfig } from "../../pages/ExperiencePointView/pointViewFormConfig";
import { AuthContext } from "../../context/auth.context";
import { API_ENDPOINTS } from "../../utils/api";

const ExperiencePointView = () => {
  const axios = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;
  const decoded = auth?.accessToken ? decodeToken(auth.accessToken) : undefined;
  const role = decoded?.role || "";
  const organizationID = decoded?.organizationID || "";
  return (
    <>
      <ExperiencePointTable
        title="Thêm sinh viên"
        columnsSchema={columnsSchema}
        API_ENDPOINTS={API_ENDPOINTS}
        accessToken={accessToken}
        organizationID={role === "admin" ? " " : organizationID}
        role={role}
        formConfig={formConfig}
      />
    </>
  );
};

export default ExperiencePointView;
