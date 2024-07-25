import { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SememsterAddForm from "./SemesterAddForm";

// eslint-disable-next-line react/prop-types
const AddToolbar = ({ title }) => {
  // const { rows } = useContext(SemesterContext);
  const [showForm, setShowForm] = useState(false);
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

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
      <SememsterAddForm
        open={showForm}
        handleClose={handleCloseForm}
        title={title}
      />
    </>
  );
};

export default AddToolbar;
