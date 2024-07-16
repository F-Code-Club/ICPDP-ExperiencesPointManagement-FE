/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import useFetchRole from "../hooks/useFetchRole";
import StudentForm from "../../../components/Form/StudentForm";
import { toastError } from "../../../utils/toast";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { PAGE_SIZE } from "../../../constant/core";
const AddToolbar = ({
  setRows,
  setOriginalRows,
  rows,
  title,
  API_ENDPOINTS,
  accessToken,
  tables,
  setTables,
  currentTable,
  currentPage,
  role,
}) => {
  const { config, participantRole } = useFetchRole(
    API_ENDPOINTS,
    accessToken,
    role
  );
  const [showForm, setShowForm] = useState(false);
  const axios = useAxiosPrivate();
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleSave = async (formData) => {
    if (!accessToken) {
      return;
    }

    const studentID = formData.studentID.toUpperCase().trim();
    const selectedRole = formData.role;
    const roleData = participantRole.find((role) => role.role === selectedRole);
    const point = roleData?.point;

    const newRow = {
      ...formData,
      studentID,
      point,
      eventID: currentTable,
      id:
        currentPage !== 0
          ? rows.length + 1 + currentPage * PAGE_SIZE
          : rows.length + 1,
    };

    try {
      const response = await axios.post(
        `${API_ENDPOINTS.EVENTS_POINT.ADD}/${currentTable}`,
        newRow,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data.data;

      const updatedRow = {
        ...newRow,
        name: data.studentName,
        point: data.point,
        role: data.role,
      };

      setRows((prevRows) => [...prevRows, updatedRow]);
      setOriginalRows((prevRows) => [...prevRows, updatedRow]);

      const updatedTables = tables.map((table) =>
        table.eventID === currentTable
          ? { ...table, rows: [...table.rows, updatedRow] }
          : table
      );

      setTables(updatedTables);
      setShowForm(false);
    } catch (error) {
      toastError("Saving failed!!!!");
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenForm}
        sx={{
          borderRadius: 1,
          backgroundColor: "primary.main",
          color: "text.light",
          height: 36,
          width: 73,
          padding: "10px",
          fontSize: 12,
          textTransform: "none",
        }}
      >
        Thêm
        <AddIcon sx={{ color: "text.light", width: 15, height: 15 }} />
      </Button>

      <StudentForm
        open={showForm}
        handleClose={handleCloseForm}
        handleSave={handleSave}
        title={title}
        accessToken={accessToken}
        func={"Thêm"}
        formConfig={config}
      />
    </>
  );
};

export default AddToolbar;
