import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import useFetchRole from "../hooks/useFetchRole";
import StudentForm from "../../../components/Form/StudentForm";
import { toastError, toastWarning } from "../../../utils/toast";

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
  const { config, participantRole } = useFetchRole(API_ENDPOINTS, accessToken, role);
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleSave = async (formData) => {
    if (!accessToken) {
      console.log("No access token");
      return;
    }

    const newRows = formData.map((entry) => {
      const studentID = entry?.studentID.toUpperCase().trim();
      const selectedRole = entry?.role;
      const roleData = participantRole.find((role) => role.role === selectedRole);
      const point = roleData?.point;

      return {
        ...entry,
        studentID,
        point,
        eventID: currentTable,
        id:
          currentPage !== 0
            ? rows.length + 1 + currentPage * 10
            : rows.length + 1,
      };
    });

    

    try {
      const response = await axios.post(
        `${API_ENDPOINTS.EVENTS_POINT.ADD}/${currentTable}`,
        uniqueNewRows,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data.data;
      const updatedRows = uniqueNewRows.map((newRow, index) => ({
        ...newRow,
        name: data[index]?.studentName,
        point: data[index]?.point,
        role: data[index]?.role,
      }));

      setRows((prevRows) => [...prevRows, ...updatedRows]);
      setOriginalRows((prevRows) => [...prevRows, ...updatedRows]);

      const updatedTables = tables.map((table) =>
        table?.eventID === currentTable
          ? { ...table, rows: [...table.rows, ...updatedRows] }
          : table
      );

      setTables(updatedTables);
      setShowForm(false);
    } catch (error) {
      toastError("Saving failed.");
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
