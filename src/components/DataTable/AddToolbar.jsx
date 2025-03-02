import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ManagementForm from "../Form/ManagementForm";
import axios from "../../config/axios";
import { toastError } from "../../utils/toast";
const AddToolbar = ({
  setRows,
  setOriginalRows,
  rows,
  title,
  API_ENDPOINTS,
  accessToken,
  role,
  formConfig,
}) => {
  const [showForm, setShowForm] = useState(false);
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleSave = async (formData) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.ADD,
        { ...formData, role },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.data.data;
      console.log(data);
      if (response.status === 200 || response.status === 201) {
        const id =
          rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
        const newRow = {
          ...data,
          id,
        };
        setRows((prevRows) => [...prevRows, newRow]);
        setOriginalRows((prevRows) => [...prevRows, newRow]);
        setShowForm(false);
      }
    } catch (error) {
      toastError("Saving Fail..");
      toastError(error.response.data.message);
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
      <ManagementForm
        open={showForm}
        handleClose={handleCloseForm}
        title={`Thêm ${title}`}
        handleSave={handleSave}
        func={"Thêm"}
        accessToken={accessToken}
        API_ENDPOINTS={API_ENDPOINTS}
        formConfig={formConfig}
      />
    </>
  );
};

export default AddToolbar;
