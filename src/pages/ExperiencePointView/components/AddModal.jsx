import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { ManagementFormStyles as styles } from "../../../components/Form/style";

// eslint-disable-next-line react/prop-types
function AddModal({ open, handleClose }) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (!open) {
      setInfo({});
    }
  }, [setInfo, open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: "red",
          width: 100,
          height: 100,
          position: "absolute",
          left: "70%",
        }}
      ></Box>
    </Modal>
  );
}

export default AddModal;
