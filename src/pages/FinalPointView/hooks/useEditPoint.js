import { useContext, useState } from "react";
import { FinalPointContext } from "../context/finalPointContext";
import { API_ENDPOINTS } from "../../../utils/api";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { serverDataFormatter, clientDataFormatter } from "../dataFormatter";
import { toastError, toastSuccess } from "../../../utils/toast";
import useFetchStudentData from "./useFetchStudentData";
const useEditPoint = (rowToEdit) => {
  const [rowData, setRowData] = useState(rowToEdit);
  const {
    auth: { accessToken },
  } = useAuth();
  const axios = useAxiosPrivate();
  const { selectedSemester, selectedYear, setOriginalRows, setRows, rows } =
    useContext(FinalPointContext);
  const { fetchData } = useFetchStudentData();
  const updateRow = async (updatedData) => {
    const formattedData = serverDataFormatter(updatedData);
    try {
      const response = await axios.patch(
        `${API_ENDPOINTS.FINAL_POINTS.UPDATE}/${selectedYear}&${selectedSemester}&${rowToEdit?.studentID}`,
        formattedData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.status === 200) {
        const data = response.data.data;
        const updatedData = clientDataFormatter(data);

        const updatedRows = rows.map((row) =>
          row.studentID === rowToEdit.studentID
            ? { ...row, ...updatedData, id: row.id }
            : row
        );
        setRows(updatedRows);
        setOriginalRows(updatedRows);
        fetchData();
        toastSuccess("Update successfully.");
      }
    } catch (error) {
      toastError("Update fail.");
    }
  };

  return { rowData, setRowData, updateRow };
};

export default useEditPoint;
