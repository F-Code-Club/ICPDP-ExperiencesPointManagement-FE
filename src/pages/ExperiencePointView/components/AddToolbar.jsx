/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import useFetchRole from "../hooks/useFetchRole";
import StudentForm from "../../../components/Form/StudentForm";
import { toastError, toastSuccess } from "../../../utils/toast";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { PAGE_SIZE } from "../../../constant/core";
import useAuth from "../../../hooks/useAuth";
import { decodeToken } from "react-jwt";
const AddToolbar = ({
  setRows,
  setOriginalRows,
  rows,
  title,
  API_ENDPOINTS,
  tables,
  setTables,
  currentTable,
  currentPage,
}) => {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? decodeToken(auth.accessToken) : undefined;
  const role = decoded?.role || "";

  const { config, participantRole } = useFetchRole(
    API_ENDPOINTS,
    auth?.accessToken,
    role
  );
  const [showForm, setShowForm] = useState(false);
  const axios = useAxiosPrivate();
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleSave = async (formData) => {
    if (!auth?.accessToken) {
      return;
    }

    const studentID = formData.studentID.toUpperCase().trim();
    if (rows.some(val => val.studentID === studentID)) {
      toastError("Student is existed in this event");
      return;
    }
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
        {
          studentID,
          role: formData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": `application/json`,
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
      toastSuccess("Add student successfully")
    } catch (error) {
      toastError("Saving failed");
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
        accessToken={auth?.accessToken}
        func={"Thêm"}
        formConfig={config}
      />
    </>
  );
};

export default AddToolbar;
