import ExperiencePointTable from "./components/ExperiencePointTable";
import { useContext } from "react";
import { decodeToken } from "react-jwt";
import columnsSchema from "./column";
import { AuthContext } from "../../context/auth.context";
import { API_ENDPOINTS } from "../../utils/api";
const ExperiencePointView = () => {
  const {
    auth: { accessToken },
  } = useContext(AuthContext);
  const decoded = accessToken ? decodeToken(accessToken) : undefined;
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
      />
    </>
  );
};

export default ExperiencePointView;
