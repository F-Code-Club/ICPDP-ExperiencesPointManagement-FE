import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ManagementForm from "../Form/ManagementForm";
import axios from "../../config/axios";

const AddToolbar = ({
  setRows,
  setOriginalRows,
  rows,
  title,
  API_ENDPOINTS,
  accessToken,
  role,
}) => {
  const [showForm, setShowForm] = useState(false);
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleSave = async (formData) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.ADD,
        { ...formData, role, avatar: formData.avatar },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.status);
      const id =
        rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
      const newRow = {
        ...formData,
        id,
        avatar: formData.avatar,
      };
      setRows((prevRows) => [...prevRows, newRow]);
      setOriginalRows((prevRows) => [...prevRows, newRow]);
      setShowForm(false);
    } catch (error) {
      console.error("Error while saving:", error);
      console.log("Response data:", error.response.data);
      console.log("Status:", error.response.status);
      console.log("Headers:", error.response.headers);
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
      />
    </>
  );
};

export default AddToolbar;
