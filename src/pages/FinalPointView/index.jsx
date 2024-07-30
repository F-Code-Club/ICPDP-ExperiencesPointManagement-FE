import { useContext } from "react";
import { decodeToken } from "react-jwt";
import { AuthContext } from "../../context/auth.context";
import { API_ENDPOINTS } from "../../utils/api";
import { columnGroupingModel, columnsSchema } from "./column";

import FinalPointTable from "./components/FinalPointTable";
const FinalPointView = () => {
  return (
    <FinalPointTable
      columnsSchema={columnsSchema}
      columnGroupingModel={columnGroupingModel}
    />
  );
};

export default FinalPointView;
