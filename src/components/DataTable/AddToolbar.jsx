import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import ManagementForm from "../Form/ManagementForm";

const AddToolbar = ({ setRows, rows, title }) => {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleSave = (formData) => {
    const id = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    const newRow = { id, ...formData, isNew: true };
    setRows((oldRows) => [...oldRows, newRow]);
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
