import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import StudentForm from "../../../components/Form/StudentForm";
import { toastError } from "../../../utils/toast";

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
  formConfig,
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleSave = async (formData) => {
    if (!accessToken) {
      console.log("No access token");
      return;
    }

    try {
      const response = await axios.post(
        `https://epm-be-dev.f-code.tech${API_ENDPOINTS.EVENTS_POINT.ADD}/${currentTable}`,
        {
          ...formData,
          studentID: formData?.studentID.toUpperCase().trim(),
          point: parseInt(formData?.point) || 5,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.data.data;
      const newRow = {
        ...data,
        name: data?.studentName,
        point: data?.point,
        role: data?.role,
        eventID: currentTable,
        id: rows.length + 1,
      };
      setRows((prevRows) => [...prevRows, newRow]);
      setOriginalRows((prevRows) => [...prevRows, newRow]);
      const updatedTables = tables.map((table) =>
        table?.eventID === currentTable
          ? {
              ...table,
              rows: [...table.rows, newRow],
            }
          : table
      );
      setTables(updatedTables);
      setShowForm(false);
    } catch (error) {
      toastError("Saving failed.");
      toastError(error);
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
        formConfig={formConfig}
      />
    </>
  );
};

export default AddToolbar;
