import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import StudentForm from "../../../components/Form/StudentForm";
const AddToolbar = ({
  setRows,
  setOriginalRows,
  rows,
  title,
  API_ENDPOINTS,
  accessToken,
  role,
  tables,
  setTables,
  currentTable,
  formConfig,
}) => {
  const [showForm, setShowForm] = useState(false);
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  const axios = useAxiosPrivate();
  const handleSave = async (formData) => {
    //-=API=-
    // try {
    //   const response = await axios.post(
    //     API_ENDPOINTS.ADD,
    //     { ...formData, role },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "*/*",
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   );
    //   const data = await response.data.data;
    //   if (response.status === 200 || response.status === 201) {
    //     const id =
    //       rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    //     const newRow = {
    //       ...data,
    //       id,
    //     };
    //     setRows((prevRows) => [...prevRows, newRow]);
    //     setOriginalRows((prevRows) => [...prevRows, newRow]);
    //     setShowForm(false);
    //   }
    // } catch (error) {
    //   toastError("Saving Fail..");
    //   toastError(error.response.data.message);
    // }

    //-=No API=-
    const id = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    const newRow = {
      ...formData,
      id,
    };
    setRows((prevRows) => [...prevRows, newRow]);
    setOriginalRows((prevRows) => [...prevRows, newRow]);
     const updatedTables = tables.map((table) => {
      if (table.tableID === currentTable) {
        const updatedRows = [...table.row, newRow];
        return {
          ...table,
          row: updatedRows,
        };
      }
      return table;
    });

    setTables(updatedTables);
    setShowForm(false);
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
        func={"Thêm"}
        formConfig={formConfig}
      />
    </>
  );
};

export default AddToolbar;
